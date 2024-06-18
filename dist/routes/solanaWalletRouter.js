"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solanaWalletController_1 = require("../controllers/solanaWalletController");
const solanaWalletRouter = express_1.default.Router();
solanaWalletRouter.post("/tx/transfer-lamports", solanaWalletController_1.constructTransferLamportsTx);
solanaWalletRouter.post("/tx/transfer-spl", solanaWalletController_1.constructTransferSplTx);
solanaWalletRouter.post("/tx/transfer-nft", solanaWalletController_1.constructTransferNftTx);
exports.default = solanaWalletRouter;
