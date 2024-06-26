"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletTransaction = exports.getWalletTransactions = exports.getWalletNfts = exports.getWalletTokens = void 0;
const services_1 = require("../services");
const models_1 = require("../models");
function getWalletTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.query;
        if (!address) {
            return res.json({ error: "Address is required" });
        }
        const tokenBalanceByAddressMap = yield (0, services_1.getWalletAssetService)().getTokenBalances(address.toString());
        const tokenAddresses = Array.from(tokenBalanceByAddressMap.keys());
        const marketDataByAddressMap = yield (0, services_1.getTokenPriceService)().getMarketDatasByAddresses(tokenAddresses);
        const tokens = tokenAddresses.map((address) => {
            const balance = tokenBalanceByAddressMap.get(address);
            const marketData = marketDataByAddressMap.get(address);
            return Object.assign(Object.assign({}, balance), { marketData });
        });
        res.json({ tokens });
    });
}
exports.getWalletTokens = getWalletTokens;
function getWalletNfts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.query;
        if (!address) {
            return res.json({ error: "Address is required" });
        }
        const nfts = yield (0, services_1.getWalletAssetService)().getNfts(address.toString());
        res.json({ nfts });
    });
}
exports.getWalletNfts = getWalletNfts;
function getWalletTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.query;
        if (!address) {
            return res.json({ error: "Address is required" });
        }
        models_1.WalletTransactionModel.find({
            $or: [
                {
                    fromAddress: address,
                },
                {
                    toAddress: address,
                },
            ],
        })
            .sort("-createdAt")
            .then((transactions) => {
            return res.json({ transactions });
        })
            .catch((e) => res.json({ error: e }));
    });
}
exports.getWalletTransactions = getWalletTransactions;
function createWalletTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { signature, type, fromAddress, toAddress, token, error } = req.body;
        const newWalletTransaction = new models_1.WalletTransactionModel({
            signature,
            type,
            fromAddress,
            toAddress,
            token,
            error,
        });
        newWalletTransaction
            .save()
            .then((transaction) => res.json({ transaction }))
            .catch((e) => res.json({ error: e }));
    });
}
exports.createWalletTransaction = createWalletTransaction;
//@ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};
