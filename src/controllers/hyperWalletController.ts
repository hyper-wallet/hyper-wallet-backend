import { Request, Response } from "express";
import { hyperWalletProgram, provider } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import { gasFeeSponsor } from "../lib/gas-fee-sponsor";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export async function getHyperWalletAccount(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  const hyperWalletAccount =
    await hyperWalletProgram.account.hyperWallet.fetchNullable(
      new anchor.web3.PublicKey(address)
    );
  res.json({ hyperWalletAccount });
}

export async function constructHyperTransferLamportsTx(
  req: Request,
  res: Response
) {
  const {
    fromHyperPda,
    hyperOwnerAddress,
    toAddress,
    lamports,
    otp_hash,
    proof_hash,
  } = req.body;

  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferLamports({
        lamports: new anchor.BN(lamports),
        otp_hash,
        proof_hash,
      })
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
}

export async function constructHyperTransferSplTx(req: Request, res: Response) {
  const {
    fromHyperWalletPda,
    hyperWalletOwnerAddress,
    toAddress,
    tokenMintAddress,
    rawAmount,
    otp_hash,
    proof_hash,
  } = req.body;

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
      .transferSpl({
        rawAmount: new anchor.BN(rawAmount),
        otp_hash,
        proof_hash,
      })
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
}

export async function constructHyperTransferNftTx(req: Request, res: Response) {
  const TRANSFER_NFT_RAW_AMOUNT = 1; // There's only 1 nft per mint address
  const {
    fromHyperWalletPda,
    hyperWalletOwnerAddress,
    toAddress,
    nftMintAddress,
    otp_hash,
    proof_hash,
  } = req.body;

  const fromHyperWalletAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(nftMintAddress),
    new PublicKey(fromHyperWalletPda),
    true
  );
  const toAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(nftMintAddress),
    new PublicKey(toAddress),
    true
  );
  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferSpl({
        rawAmount: new anchor.BN(TRANSFER_NFT_RAW_AMOUNT),
        otp_hash,
        proof_hash,
      })
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
}
