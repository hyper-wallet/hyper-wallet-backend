import { Request, Response } from "express";
import { hyperWalletProgram, provider } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import {
  createPayGasFeeWithUsdtTx,
  createSponsoredTx,
  gasFeeSponsor,
} from "../lib/gas-fee-sponsor";
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

export async function constructCreateHyperWalletTx(
  req: Request,
  res: Response
) {
  const { hyperWalletPda, ownerAddress } = req.body;

  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .createHyperWallet()
      .accounts({
        hyperWallet: hyperWalletPda,
        owner: ownerAddress,
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

export async function constructCloseHyperWalletTx(req: Request, res: Response) {
  const { hyperWalletPda, ownerAddress } = req.body;
  console.log(
    "🚀 ~ constructCloseAccountTx ~ { hyperWalletPda, ownerAddress }:",
    { hyperWalletPda, ownerAddress }
  );

  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .closeHyperWallet()
      .accounts({
        hyperWallet: hyperWalletPda,
        owner: ownerAddress,
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

export async function constructHyperTransferLamportsTx(
  req: Request,
  res: Response
) {
  const {
    fromHyperPda,
    hyperOwnerAddress,
    toAddress,
    lamports,
    otpHash,
    proofHash,
  } = req.body;

  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferLamports({
        lamports: new anchor.BN(lamports),
        otpHash,
        proofHash,
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
    otpHash,
    proofHash,
    feeToken,
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
  const ix = await hyperWalletProgram.methods
    .transferSpl({
      rawAmount: new anchor.BN(rawAmount),
      otpHash: [...Buffer.from(otpHash.data)],
      //@ts-ignore
      proofHash: [...proofHash.map((v) => [...Buffer.from(v.data)])],
    })
    .accounts({
      fromHyperWalletAta: fromHyperWalletAta.address,
      fromHyperWallet: fromHyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
      to: toAddress,
      toAta: toAta.address,
    })
    .instruction();
  if (feeToken == "usdt") {
    const { base64tx } = await createPayGasFeeWithUsdtTx(
      ix,
      fromHyperWalletPda
    );
    res.json({ base64tx });
  } else {
    const { base64tx } = await createSponsoredTx(ix);
    res.json({ base64tx });
  }
}

export async function constructHyperTransferNftTx(req: Request, res: Response) {
  const TRANSFER_NFT_RAW_AMOUNT = 1; // There's only 1 nft per mint address
  const {
    fromHyperWalletPda,
    hyperWalletOwnerAddress,
    toAddress,
    nftMintAddress,
    otpHash,
    proofHash,
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
        otpHash,
        proofHash,
      })
      .accounts({
        fromHyperWalletAta: fromHyperWalletAta.address,
        fromHyperWallet: fromHyperWalletPda,
        hyperWalletOwner: hyperWalletOwnerAddress,
        to: toAddress,
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
