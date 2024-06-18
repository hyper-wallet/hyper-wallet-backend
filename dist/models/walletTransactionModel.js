"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const walletTransactionSchema = new mongoose_1.default.Schema({
    signature: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    fromAddress: {
        type: String,
        require: true,
    },
    toAddress: {
        type: String,
        require: true,
    },
    token: {
        iconUrl: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
    },
    amount: {
        type: String,
        require: true,
    },
    value: {
        type: String,
        require: true,
    },
});
exports.WalletTransactionModel = mongoose_1.default.model("WalletTransaction", walletTransactionSchema);
