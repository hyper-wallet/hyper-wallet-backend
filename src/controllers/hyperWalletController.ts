import { Request, Response } from "express";
import { connection, hyperWalletProgram } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import { coinGeckoClient } from "../services";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { getCoinGeckoId } from "../lib/utils";
import { PublicKey } from "@solana/web3.js";

export const getHyperWalletAccount = async (req: Request, res: Response) => {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  const hyperWalletAccount =
    await hyperWalletProgram.account.hyperWallet.fetchNullable(
      new anchor.web3.PublicKey(address)
    );
  res.json({ hyperWalletAccount });
};

export const getBalanceAndTokens = async (req: Request, res: Response) => {
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
  const coinGeckoIds = tokenAccounts.map((tokenAccount) => {
    return getCoinGeckoId(tokenAccount.pubkey.toString());
  });
  const tokenData = await coinGeckoClient.getCoinDataByIds(coinGeckoIds);
  console.log(tokenData);
};
