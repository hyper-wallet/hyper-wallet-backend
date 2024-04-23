import { Request, Response } from "express";
import { connection, hyperWalletProgram } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import { coinGeckoClient } from "../services";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { getCoinGeckoId } from "../lib/utils";
import { PublicKey } from "@solana/web3.js";

export const getBalances = async (req: Request, res: Response) => {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  const tokenAccounts = (
    await connection.getParsedTokenAccountsByOwner(
      new anchor.web3.PublicKey(address),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    )
  ).value;
  let map = new Map();
  tokenAccounts.forEach((tokenAccount) => {
    const balance =
      tokenAccount.account.data.parsed["info"]["tokenAmount"]["amount"];
    const mint = tokenAccount.account.data.parsed["info"]["mint"];
    map.set(getCoinGeckoId(mint), {
      balance,
      mint_address: mint,
      decimals: 6
    });
  });
  const lamportsBalance = await connection.getBalance(new PublicKey(address));
  map.set("solana", {
    balance: lamportsBalance,
    mint_address: "So11111111111111111111111111111111111111111",
    decimals: 9
  });
  const coinGeckoIds = Array.from(map.keys());
  const tokenData = await coinGeckoClient.getCoinDataByIds(coinGeckoIds);
  const tokenBalances = tokenData.map((tokenData: any) => {
    return {
      ...tokenData,
      ...map.get(tokenData.id),
    };
  });
  res.json({ tokenBalances });
};
