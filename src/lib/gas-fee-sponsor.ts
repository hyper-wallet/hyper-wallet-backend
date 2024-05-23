import { web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { provider } from "./hyper-wallet-program";
// @ts-ignore
import bs58 from "bs58";
import {
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const privateKey = process.env.GAS_FEE_SPONSOR_PRIVATE_KEY ?? "";

export const gasFeeSponsor = web3.Keypair.fromSecretKey(
  bs58.decode(privateKey)
);

export async function createSponsoredTx(
  instruction: anchor.web3.TransactionInstruction
) {
  const tx = new anchor.web3.Transaction();
  tx.add(instruction);
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
  return { base64tx };
}

export async function createPayGasFeeWithUsdtTx(
  instruction: anchor.web3.TransactionInstruction,
  sponsoredAddress: string
) {
  const USDT_MINT_ADDRESS = "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a";
  const fromAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(USDT_MINT_ADDRESS),
    new PublicKey(sponsoredAddress),
    true
  );
  const toAta = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    gasFeeSponsor,
    new PublicKey(USDT_MINT_ADDRESS),
    gasFeeSponsor.publicKey,
    true
  );
  const tx = new anchor.web3.Transaction();
  const payGasFeeWithUsdtIx = createTransferCheckedInstruction(
    fromAta.address,
    new PublicKey(USDT_MINT_ADDRESS),
    toAta.address,
    new PublicKey(sponsoredAddress),
    0.000015 * Math.pow(10, 6),
    6
  );
  tx.add(payGasFeeWithUsdtIx);
  tx.add(instruction);
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
  return { base64tx };
}
