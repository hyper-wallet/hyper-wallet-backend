import * as anchor from "@coral-xyz/anchor";
import { provider } from "../lib/hyper-wallet-program";
import { gasFeeSponsor } from "../lib/gas-fee-sponsor";
import { Request, Response } from "express";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

export const constructTransferLamportsTx = async (
  req: Request,
  res: Response
) => {
  const { fromAddress, toAddress, lamports } = req.body;

  const tx = new anchor.web3.Transaction();
  tx.add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(fromAddress),
      toPubkey: new PublicKey(toAddress),
      lamports,
    })
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

export const constructTransferSplTx = async (req: Request, res: Response) => {
  const { fromAddress, toAddress, tokenMintAddress, rawAmount } = req.body;

  const fromAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(tokenMintAddress),
    new PublicKey(fromAddress),
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
    createTransferCheckedInstruction(
      fromAta.address,
      new PublicKey(tokenMintAddress),
      toAta.address,
      new PublicKey(fromAddress),
      rawAmount,
      6
    )
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
