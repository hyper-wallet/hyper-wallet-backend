import * as anchor from "@coral-xyz/anchor";
import { hyperWalletProgram, provider } from "../lib/hyper-wallet-program";
import { gasFeeSponsor } from "../lib/gas-fee-sponsor";
import { Request, Response } from "express";
import { BN } from "@coral-xyz/anchor";

export const constructCreateHyperWalletTx = async (
  req: Request,
  res: Response
) => {
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
    await provider.connection.getRecentBlockhash("confirmed")
  ).blockhash;
  tx.partialSign(gasFeeSponsor);
  const serializedTx = tx.serialize({
    verifySignatures: true,
    requireAllSignatures: false,
  });
  const base64tx = serializedTx.toString("base64");
  res.json({ base64tx });
};

export const constructTransferLamportsTx = async (
  req: Request,
  res: Response
) => {
  const { fromHyperWalletPda, hyperWalletOwnerAddress, toAddress, amount } =
    req.body;
  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferLamports(new BN(amount))
      .accounts({
        fromHyperWallet: fromHyperWalletPda,
        hyperWalletOwner: hyperWalletOwnerAddress,
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

export const constructTransferSplTx = async (req: Request, res: Response) => {
  const {
    fromHyperWalletAtaAddress,
    fromHyperWalletPda,
    hyperWalletOwnerAddress,
    toAtaAddress,
    amount,
  } = req.body;
  const tx = new anchor.web3.Transaction();
  tx.add(
    await hyperWalletProgram.methods
      .transferSpl(new BN(amount))
      .accounts({
        fromHyperWalletAta: fromHyperWalletAtaAddress,
        fromHyperWallet: fromHyperWalletPda,
        hyperWalletOwner: hyperWalletOwnerAddress,
        toAta: toAtaAddress,
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
