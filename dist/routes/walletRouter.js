"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = require("../controllers/walletController");
const walletRouter = express_1.default.Router();
walletRouter.get("/tokens", walletController_1.getWalletTokens);
walletRouter.get("/nfts", walletController_1.getWalletNfts);
walletRouter.post("/transactions", walletController_1.createWalletTransaction);
walletRouter.get("/transactions", walletController_1.getWalletTransactions);
exports.default = walletRouter;
