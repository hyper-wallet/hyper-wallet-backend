import express from "express";

import {
  constructHyperTransferLamportsTx,
  constructHyperTransferNftTx,
  constructHyperTransferSplTx,
  getHyperWalletAccount,
  getHyperWalletTransactions,
} from "../controllers/hyperWalletController";

const hyperWalletRouter = express.Router();

hyperWalletRouter.get("/", getHyperWalletAccount);
hyperWalletRouter.post(
  "/tx/transfer-lamports",
  constructHyperTransferLamportsTx
);
hyperWalletRouter.post("/tx/transfer-spl", constructHyperTransferSplTx);
hyperWalletRouter.post("/tx/transfer-nft", constructHyperTransferNftTx);
hyperWalletRouter.get("/transactions", getHyperWalletTransactions);

export default hyperWalletRouter;
