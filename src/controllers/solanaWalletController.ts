import { web3 } from "@coral-xyz/anchor";
import { gasFeeSponsor } from "../services";
import { Request, Response } from "express";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { network } from "../services";

export async function constructTransferLamportsTx(req: Request, res: Response) {
  const { fromAddress, toAddress, lamports } = req.body;

  const tx = new web3.Transaction();
  tx.add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(fromAddress),
      toPubkey: new PublicKey(toAddress),
      lamports,
    })
  );
  tx.feePayer = gasFeeSponsor.address;
  tx.recentBlockhash = await network.getRecentBlockhash();
  tx.partialSign(gasFeeSponsor.signer);
  const serializedTx = tx.serialize({
    verifySignatures: true,
    requireAllSignatures: false,
  });
  const base64tx = serializedTx.toString("base64");
  res.json({ base64tx });
}

export async function constructTransferSplTx(req: Request, res: Response) {
  const { fromAddress, toAddress, tokenMintAddress, rawAmount, feeToken } =
    req.body;

  const fromAta = await getOrCreateAssociatedTokenAccount(
    network.connection,
    gasFeeSponsor.signer,
    new PublicKey(tokenMintAddress),
    new PublicKey(fromAddress),
    true
  );

  const toAta = await getOrCreateAssociatedTokenAccount(
    network.connection,
    gasFeeSponsor.signer,
    new PublicKey(tokenMintAddress),
    new PublicKey(toAddress),
    true
  );

  const tx = new web3.Transaction();
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

  if (feeToken == "USDT") {
    const { base64tx } = await gasFeeSponsor.createPayGasFeeWithUsdtTx(
      tx,
      fromAddress
    );
    return res.json({ base64tx });
  } else {
    const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);
    return res.json({ base64tx });
  }
}

export async function constructTransferNftTx(req: Request, res: Response) {
  const { fromAddress, toAddress, nftMintAddress, feeToken } = req.body;

  const fromAta = await getOrCreateAssociatedTokenAccount(
    network.connection,
    gasFeeSponsor.signer,
    new PublicKey(nftMintAddress),
    new PublicKey(fromAddress),
    true
  );

  const toAta = await getOrCreateAssociatedTokenAccount(
    network.connection,
    gasFeeSponsor.signer,
    new PublicKey(nftMintAddress),
    new PublicKey(toAddress),
    true
  );

  const tx = new web3.Transaction();
  tx.add(
    createTransferCheckedInstruction(
      fromAta.address,
      new PublicKey(nftMintAddress),
      toAta.address,
      new PublicKey(fromAddress),
      1, // Nft amount
      0 // Nft decimals is always 0
    )
  );

  if (feeToken == "USDT") {
    const { base64tx } = await gasFeeSponsor.createPayGasFeeWithUsdtTx(
      tx,
      fromAddress
    );
    return res.json({ base64tx });
  } else {
    const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);
    return res.json({ base64tx });
  }
}
