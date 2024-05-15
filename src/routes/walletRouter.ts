import express from "express";

import {
  createWalletTransaction,
  getWalletNfts,
  getWalletTokens,
  getWalletTransactions,
} from "../controllers/walletController";

const walletRouter = express.Router();

walletRouter.get("/tokens", getWalletTokens);
walletRouter.get("/nfts", getWalletNfts);
walletRouter.post("/transactions", createWalletTransaction);
walletRouter.get("/transactions", getWalletTransactions);

export default walletRouter;
