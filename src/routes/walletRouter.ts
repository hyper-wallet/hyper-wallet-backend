import express from "express";

import {
  getBalances,
  getFungibleAssetsByOwner,
  getNonFungibleAssetsByOwner,
} from "../controllers/walletController";

const walletRouter = express.Router();

walletRouter.get("/balances", getBalances);
walletRouter.get("/fungible-assets", getFungibleAssetsByOwner);
walletRouter.get("/non-fungible-assets", getNonFungibleAssetsByOwner);

export default walletRouter;
