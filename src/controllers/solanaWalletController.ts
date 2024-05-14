import * as anchor from "@coral-xyz/anchor";
import { provider } from "../lib/hyper-wallet-program";
import {
  createPayGasFeeWithUsdtTx,
  createSponsoredTx,
  gasFeeSponsor,
} from "../lib/gas-fee-sponsor";
import { Request, Response } from "express";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

export async function constructTransferLamportsTx(req: Request, res: Response) {
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
}

export async function constructTransferSplTx(req: Request, res: Response) {
  const { fromAddress, toAddress, tokenMintAddress, rawAmount, feeToken } =
    req.body;

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

  const ix = createTransferCheckedInstruction(
    fromAta.address,
    new PublicKey(tokenMintAddress),
    toAta.address,
    new PublicKey(fromAddress),
    rawAmount,
    6
  );
  if (feeToken == "USDT") {
    console.log("🚀 ~ constructTransferSplTx ~ feeToken:", feeToken);
    const { base64tx } = await createPayGasFeeWithUsdtTx(ix, fromAddress);
    return res.json({ base64tx });
  } else {
    const { base64tx } = await createSponsoredTx(ix);
    return res.json({ base64tx });
  }
}

export async function constructTransferNftTx(req: Request, res: Response) {
  const { fromAddress, toAddress, nftMintAddress, feeToken } = req.body;

  const fromAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(nftMintAddress),
    new PublicKey(fromAddress),
    true
  );

  const toAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(nftMintAddress),
    new PublicKey(toAddress),
    true
  );

  const ix = createTransferCheckedInstruction(
    fromAta.address,
    new PublicKey(nftMintAddress),
    toAta.address,
    new PublicKey(fromAddress),
    1, // Nft amount
    0 // Nft decimals is always 0
  );
  if (feeToken == "USDT") {
    console.log("🚀 ~ constructTransferSplTx ~ feeToken:", feeToken);
    const { base64tx } = await createPayGasFeeWithUsdtTx(ix, fromAddress);
    return res.json({ base64tx });
  } else {
    const { base64tx } = await createSponsoredTx(ix);
    return res.json({ base64tx });
  }
}
