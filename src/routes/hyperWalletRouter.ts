import express from "express";

import {
  constructHyperTransferLamportsTx,
  constructHyperTransferSplTx,
  getBalanceAndTokens,
  getHyperWalletAccount,
} from "../controllers/hyperWalletController";

const txRouter = express.Router();

txRouter.get("/", getHyperWalletAccount);
txRouter.get("/balance-tokens", getBalanceAndTokens);
txRouter.post("/tx/transfer-lamports", constructHyperTransferLamportsTx);
txRouter.post("/tx/transfer-spl", constructHyperTransferSplTx);

export default txRouter;
