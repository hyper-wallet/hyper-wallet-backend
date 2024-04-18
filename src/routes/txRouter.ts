import express from "express";
import {constructCreateHyperWalletTx} from "../controllers/txController";

const txRouter = express.Router();

txRouter.post("/create-hyper-wallet", constructCreateHyperWalletTx);

export default txRouter;
