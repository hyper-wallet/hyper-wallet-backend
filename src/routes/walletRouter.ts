import express from "express";

import {
  getWalletNfts,
  getWalletTokens,
  getWalletTransactions,
} from "../controllers/walletController";

const walletRouter = express.Router();

walletRouter.get("/tokens", getWalletTokens);
walletRouter.get("/nfts", getWalletNfts);
walletRouter.get("/transactions", getWalletTransactions);

export default walletRouter;
