import { Request, Response } from "express";
import { connection, hyperWalletProgram } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";

export const getHyperWalletAccount = async (req: Request, res: Response) => {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  const hyperWalletAccount =
    await hyperWalletProgram.account.hyperWallet.fetchNullable(
      new anchor.web3.PublicKey(address)
    );
  res.json({ hyperWalletAccount });
};

export const getBalanceAndTokens = async (req: Request, res: Response) => {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }
  const lamports = await connection.getBalance(
    new anchor.web3.PublicKey(address)
  );
  res.json({
    data: {
      balance: {
        lamports,
        usd: 100,
      },
      tokens: [],
    },
  });
};
