import express from "express";

import {
  constructHyperTransferLamportsTx,
  constructHyperTransferNftTx,
  constructHyperTransferSplTx,
  getHyperWalletAccount,
} from "../controllers/hyperWalletController";

const hyperWalletRouter = express.Router();

hyperWalletRouter.get("/", getHyperWalletAccount);
hyperWalletRouter.post(
  "/tx/transfer-lamports",
  constructHyperTransferLamportsTx
);
hyperWalletRouter.post("/tx/transfer-spl", constructHyperTransferSplTx);
hyperWalletRouter.post("/tx/transfer-nft", constructHyperTransferNftTx);

export default hyperWalletRouter;
