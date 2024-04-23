import { Request, Response } from "express";
import {
  connection,
  hyperWalletProgram,
  provider,
} from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import { coinGeckoClient } from "../services";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { getCoinGeckoId } from "../lib/utils";
import { gasFeeSponsor } from "../lib/gas-fee-sponsor";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
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
};

export const constructHyperTransferLamportsTx = async (
  req: Request,
  res: Response
) => {
  const { fromHyperPda, hyperOwnerAddress, toAddress, lamports } = req.body;
  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferLamports(new anchor.BN(lamports))
      .accounts({
        fromHyperWallet: fromHyperPda,
        hyperWalletOwner: hyperOwnerAddress,
        to: toAddress,
      })
      .instruction()
  );
  tx.feePayer = gasFeeSponsor.publicKey;
  tx.recentBlockhash = (
    await provider.connection.getRecentBlockhash()
  ).blockhash;
  tx.partialSign(gasFeeSponsor);
  const serializedTx = tx.serialize({
    verifySignatures: true,
    requireAllSignatures: false,
  });
  const base64tx = serializedTx.toString("base64");
  res.json({ base64tx });
};

export const constructHyperTransferSplTx = async (
  req: Request,
  res: Response
) => {
  const {
    fromHyperWalletPda,
    hyperWalletOwnerAddress,
    toAddress,
    tokenMintAddress,
    rawAmount,
  } = req.body;
  console.log("🚀 ~ req.body:", req.body);
  const fromHyperWalletAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(tokenMintAddress),
    new PublicKey(fromHyperWalletPda),
    true
  );
  const toAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(tokenMintAddress),
    new PublicKey(toAddress),
    true
  );
  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferSpl(new anchor.BN(rawAmount))
      .accounts({
        fromHyperWalletAta: fromHyperWalletAta.address,
        fromHyperWallet: fromHyperWalletPda,
        hyperWalletOwner: hyperWalletOwnerAddress,
        toAta: toAta.address,
      })
      .instruction()
  );
  tx.feePayer = gasFeeSponsor.publicKey;
  tx.recentBlockhash = (
    await provider.connection.getRecentBlockhash()
  ).blockhash;
  tx.partialSign(gasFeeSponsor);
  const serializedTx = tx.serialize({
    verifySignatures: true,
    requireAllSignatures: false,
  });
  const base64tx = serializedTx.toString("base64");
  res.json({ base64tx });
};
