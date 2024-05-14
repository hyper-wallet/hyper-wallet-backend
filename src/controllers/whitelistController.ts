import { Request, Response } from "express";
import { hyperWalletProgram } from "../lib/hyper-wallet-program";
import { createSponsoredTx } from "../lib/gas-fee-sponsor";
import * as anchor from "@coral-xyz/anchor";

export async function constructEnableWhitelistTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;

  const ix = await hyperWalletProgram.methods
    .enableWhitelist()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .instruction();
  const { base64tx } = await createSponsoredTx(ix);

  res.json({ base64tx });
}

export async function constructDisableWhitelistTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;

  const ix = await hyperWalletProgram.methods
    .disableWhitelist()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .instruction();
  const { base64tx } = await createSponsoredTx(ix);

  res.json({ base64tx });
}

export async function constructAddToWhitelistTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress, addressToBeAdded } =
    req.body;

  const ix = await hyperWalletProgram.methods
    .addToWhitelist(new anchor.web3.PublicKey(addressToBeAdded))
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .instruction();
  const { base64tx } = await createSponsoredTx(ix);

  res.json({ base64tx });
}

export async function constructRemoveFromWhitelistTx(
  req: Request,
  res: Response
) {
  const { hyperWalletPda, hyperWalletOwnerAddress, addressToBeRemoved } =
    req.body;

  const ix = await hyperWalletProgram.methods
    .removeFromWhitelist(new anchor.web3.PublicKey(addressToBeRemoved))
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .instruction();
  const { base64tx } = await createSponsoredTx(ix);

  res.json({ base64tx });
}
