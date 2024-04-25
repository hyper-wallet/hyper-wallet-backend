import express from "express";

import {
  constructHyperTransferLamportsTx,
  constructHyperTransferSplTx,
  getBalanceAndTokens,
  getHyperWalletAccount,
  getHyperWalletTransactions,
} from "../controllers/hyperWalletController";

const hyperWalletRouter = express.Router();

hyperWalletRouter.get("/", getHyperWalletAccount);
hyperWalletRouter.get("/balance-tokens", getBalanceAndTokens);
hyperWalletRouter.post(
  "/tx/transfer-lamports",
  constructHyperTransferLamportsTx
);
hyperWalletRouter.post("/tx/transfer-spl", constructHyperTransferSplTx);
hyperWalletRouter.get("/transactions", getHyperWalletTransactions);

export default hyperWalletRouter;
