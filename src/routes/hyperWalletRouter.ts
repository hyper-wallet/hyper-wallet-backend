import express from "express";

import {
  constructCloseHyperWalletTx,
  constructCreateHyperWalletTx,
  constructHyperTransferLamportsTx,
  constructHyperTransferNftTx,
  constructHyperTransferSplTx,
  getHyperWalletAccount,
} from "../controllers/hyperWalletController";
import {
  constructAddToWhitelistTx,
  constructDisableWhitelistTx,
  constructEnableWhitelistTx,
  constructRemoveFromWhitelistTx,
} from "../controllers/whitelistController";

const hyperWalletRouter = express.Router();

hyperWalletRouter.get("/", getHyperWalletAccount);
hyperWalletRouter.post("/tx/create-hyper-wallet", constructCreateHyperWalletTx);
hyperWalletRouter.post("/tx/close-hyper-wallet", constructCloseHyperWalletTx);

hyperWalletRouter.post(
  "/tx/transfer-lamports",
  constructHyperTransferLamportsTx,
);
hyperWalletRouter.post("/tx/transfer-spl", constructHyperTransferSplTx);
hyperWalletRouter.post("/tx/transfer-nft", constructHyperTransferNftTx);

hyperWalletRouter.post("/tx/whitelist/enable", constructEnableWhitelistTx);
hyperWalletRouter.post("/tx/whitelist/disable", constructDisableWhitelistTx);
hyperWalletRouter.post("/tx/whitelist/add", constructAddToWhitelistTx);
hyperWalletRouter.post("/tx/whitelist/remove", constructRemoveFromWhitelistTx);

export default hyperWalletRouter;
