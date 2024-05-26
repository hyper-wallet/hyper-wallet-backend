import { Request, Response } from "express";
import { hyperWalletProgram } from "../lib/hyper-wallet-program";
import { gasFeeSponsor } from "../services";

export async function constructSetupOtpTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress, initTime, root } = req.body;

  const tx = await hyperWalletProgram.methods
    .setUpOtp({
      initTime,
      root: [...Buffer.from(root.data)],
    })
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .transaction();
  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);

  res.json({ base64tx });
}

export async function constructEnableOtpTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;

  const tx = await hyperWalletProgram.methods
    .enableOtp()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .transaction();
  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);

  res.json({ base64tx });
}

export async function constructDisableOtpTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;

  const tx = await hyperWalletProgram.methods
    .disableOtp()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .transaction();
  const { base64tx } = await gasFeeSponsor.createFullySponsoredTx(tx);

  res.json({ base64tx });
}
