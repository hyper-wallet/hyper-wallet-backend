import { Request, Response } from "express";
import { hyperWalletProgram } from "../lib/hyper-wallet-program";
import { createSponsoredTx } from "../lib/gas-fee-sponsor";

export async function constructSetupOtpTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress, initTime, root } = req.body;

  const ix = await hyperWalletProgram.methods
    .setUpOtp({
      initTime,
      root: [...Buffer.from(root.data)],
    })
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .instruction();
  const { base64tx } = await createSponsoredTx(ix);

  res.json({ base64tx });
}

export async function constructEnableOtpTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;
  console.log(
    "🚀 ~ constructEnableOtpTx ~ { hyperWalletPda, hyperWalletOwnerAddress }:",
    { hyperWalletPda, hyperWalletOwnerAddress }
  );

  const ix = await hyperWalletProgram.methods
    .enableOtp()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .instruction();
  const { base64tx } = await createSponsoredTx(ix);

  res.json({ base64tx });
}

export async function constructDisableOtpTx(req: Request, res: Response) {
  const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;

  const ix = await hyperWalletProgram.methods
    .disableOtp()
    .accounts({
      hyperWallet: hyperWalletPda,
      hyperWalletOwner: hyperWalletOwnerAddress,
    })
    .instruction();
  const { base64tx } = await createSponsoredTx(ix);

  res.json({ base64tx });
}
