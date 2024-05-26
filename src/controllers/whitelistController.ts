import { Request, Response } from "express";
import { hyperWalletProgram } from "../lib/hyper-wallet-program";
import { web3 } from "@coral-xyz/anchor";
import { gasFeeSponsor } from "../services";

export async function constructEnableWhitelistTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;

  const tx = await hyperWalletProgram.methods
    .enableWhitelist()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .transaction();
  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);

  res.json({ base64tx });
}

export async function constructDisableWhitelistTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;

  const tx = await hyperWalletProgram.methods
    .disableWhitelist()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .transaction();
  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);

  res.json({ base64tx });
}

export async function constructAddToWhitelistTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress, addressToBeAdded } =
    req.body;

  const tx = await hyperWalletProgram.methods
    .addToWhitelist(new web3.PublicKey(addressToBeAdded))
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .transaction();
  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);

  res.json({ base64tx });
}

export async function constructRemoveFromWhitelistTx(
  req: Request,
  res: Response
) {
  const { hyperWalletPda, hyperWalletOwnerAddress, addressToBeRemoved } =
    req.body;

  const tx = await hyperWalletProgram.methods
    .removeFromWhitelist(new web3.PublicKey(addressToBeRemoved))
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .transaction();
  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);

  res.json({ base64tx });
}
