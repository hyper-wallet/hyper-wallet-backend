import express from "express";

import { constructTransferSplTx } from "../controllers/solanaWalletController";

const solanaWalletRouter = express.Router();

solanaWalletRouter.post("/tx/transfer-lamports", constructTransferSplTx);
solanaWalletRouter.post("/tx/transfer-spl", constructTransferSplTx);

export default solanaWalletRouter;
