import express from "express";

import {
  getBalanceAndTokens,
  getHyperWalletAccount,
} from "../controllers/hyperWalletController";

const txRouter = express.Router();

txRouter.get("/", getHyperWalletAccount);
txRouter.get("/balance-tokens", getBalanceAndTokens);

export default txRouter;
