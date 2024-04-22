import express from "express";
import {
    constructCreateHyperWalletTx,
    constructTransferLamportsTx,
    constructTransferSplTx
} from "../controllers/txController";

const txRouter = express.Router();

txRouter.post("/create-hyper-wallet", constructCreateHyperWalletTx);
txRouter.post("/transfer-lamports", constructTransferLamportsTx);
txRouter.post("/transfer-spl", constructTransferSplTx);

export default txRouter;
