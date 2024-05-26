import { Request, Response } from "express";
import { hyperWalletProgram } from "../lib/hyper-wallet-program";
import { web3, BN } from "@coral-xyz/anchor";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { gasFeeSponsor, network } from "../services";

const USDT_MINT_ADDRESS = "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a";

export async function getHyperWalletAccount(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  const hyperWalletAccount =
    await hyperWalletProgram.account.hyperWallet.fetchNullable(
      new web3.PublicKey(address)
    );
  res.json({ hyperWalletAccount });
}

export async function constructCreateHyperWalletTx(
  req: Request,
  res: Response
) {
  const { hyperWalletPda, ownerAddress } = req.body;

  const tx = new web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .createHyperWallet()
      .accounts({
        hyperWallet: hyperWalletPda,
        owner: ownerAddress,
      })
      .instruction()
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

export async function constructCloseHyperWalletTx(req: Request, res: Response) {
  const { hyperWalletPda, ownerAddress } = req.body;

  const tx = new web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .closeHyperWallet()
      .accounts({
        hyperWallet: hyperWalletPda,
        owner: ownerAddress,
      })
      .instruction()
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

  const tx = new web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferLamports({
        lamports: new BN(lamports),
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
    network.connection,
    gasFeeSponsor.signer,
    new PublicKey(tokenMintAddress),
    new PublicKey(fromHyperWalletPda),
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
    await hyperWalletProgram.methods
      .transferSpl({
        rawAmount: new BN(rawAmount),
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
      .instruction()
  );

  if (feeToken == "usdt") {
    const gasFeeSponsorUsdtAta = await gasFeeSponsor.getUsdtAta();
    const hyperWalletUsdtAta = await getOrCreateAssociatedTokenAccount(
      network.connection,
      gasFeeSponsor.signer,
      new PublicKey(USDT_MINT_ADDRESS),
      new PublicKey(fromHyperWalletPda),
      true
    );
    tx.add(
      await hyperWalletProgram.methods
        .transferSpl({
          rawAmount: new BN(0.000015 * Math.pow(10, 6)),
          otpHash: [...Buffer.from(otpHash.data)],
          //@ts-ignore
          proofHash: [...proofHash.map((v) => [...Buffer.from(v.data)])],
        })
        .accounts({
          fromHyperWalletAta: hyperWalletUsdtAta.address,
          fromHyperWallet: fromHyperWalletPda,
          hyperWalletOwner: hyperWalletOwnerAddress,
          to: gasFeeSponsor.address,
          toAta: gasFeeSponsorUsdtAta.address,
        })
        .instruction()
    );
  }

  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);
  res.json({ base64tx });
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
    feeToken,
  } = req.body;

  const fromHyperWalletAta = await getOrCreateAssociatedTokenAccount(
    network.connection,
    gasFeeSponsor.signer,
    new PublicKey(nftMintAddress),
    new PublicKey(fromHyperWalletPda),
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
    await hyperWalletProgram.methods
      .transferSpl({
        rawAmount: new BN(TRANSFER_NFT_RAW_AMOUNT),
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

  if (feeToken == "usdt") {
    const gasFeeSponsorUsdtAta = await gasFeeSponsor.getUsdtAta();
    const hyperWalletUsdtAta = await getOrCreateAssociatedTokenAccount(
      network.connection,
      gasFeeSponsor.signer,
      new PublicKey(USDT_MINT_ADDRESS),
      new PublicKey(fromHyperWalletPda),
      true
    );
    tx.add(
      await hyperWalletProgram.methods
        .transferSpl({
          rawAmount: new BN(0.000015 * Math.pow(10, 6)),
          otpHash: [...Buffer.from(otpHash.data)],
          //@ts-ignore
          proofHash: [...proofHash.map((v) => [...Buffer.from(v.data)])],
        })
        .accounts({
          fromHyperWalletAta: hyperWalletUsdtAta.address,
          fromHyperWallet: fromHyperWalletPda,
          hyperWalletOwner: hyperWalletOwnerAddress,
          to: gasFeeSponsor.address,
          toAta: gasFeeSponsorUsdtAta.address,
        })
        .instruction()
    );
  }
  const base64tx = await gasFeeSponsor.createFullySponsoredTx(tx);
  res.json({ base64tx });
}
