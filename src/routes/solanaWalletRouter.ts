import express from "express";

import {
  constructTransferLamportsTx,
  constructTransferNftTx,
  constructTransferSplTx,
} from "../controllers/solanaWalletController";

const solanaWalletRouter = express.Router();

solanaWalletRouter.post("/tx/transfer-lamports", constructTransferLamportsTx);
solanaWalletRouter.post("/tx/transfer-spl", constructTransferSplTx);
solanaWalletRouter.post("/tx/transfer-nft", constructTransferNftTx);

export default solanaWalletRouter;
