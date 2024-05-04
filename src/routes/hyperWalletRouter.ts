import express from "express";

import {
  constructCloseHyperWalletTx,
  constructCreateHyperWalletTx,
  constructHyperTransferLamportsTx,
  constructHyperTransferNftTx,
  constructHyperTransferSplTx,
  constructSetupOtpTx,
  getHyperWalletAccount,
} from "../controllers/hyperWalletController";

const hyperWalletRouter = express.Router();

hyperWalletRouter.get("/", getHyperWalletAccount);
hyperWalletRouter.post("/tx/create-hyper-wallet", constructCreateHyperWalletTx);
hyperWalletRouter.post("/tx/close-hyper-wallet", constructCloseHyperWalletTx);
hyperWalletRouter.post(
  "/tx/transfer-lamports",
  constructHyperTransferLamportsTx
);
hyperWalletRouter.post("/tx/transfer-spl", constructHyperTransferSplTx);
hyperWalletRouter.post("/tx/transfer-nft", constructHyperTransferNftTx);
hyperWalletRouter.post("/tx/otp/set-up", constructSetupOtpTx);

export default hyperWalletRouter;
