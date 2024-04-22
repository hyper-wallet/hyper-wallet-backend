import express from "express";

import { getBalances } from "../controllers/walletController";

const walletRouter = express.Router();

walletRouter.get("/balances", getBalances);

export default walletRouter;
