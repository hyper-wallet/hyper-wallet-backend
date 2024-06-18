"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.gasFeeSponsor = exports.network = exports.getWalletAssetService = exports.getTokenPriceService = void 0;
const CoinGeckoService_1 = require("./CoinGeckoService");
const ShyftService_1 = require("./ShyftService");
const Network_1 = require("./Network");
const GasFeeSponsor_1 = require("./GasFeeSponsor");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const devnetAddressToCoinGeckoId = {
    "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a": "tether",
    "7BuHpQUcAoBPv77UuTcy1PqigWeeGFtnLMvfRZmoxRMA": "usd-coin",
    "9dB35ynAwActVvEPNQBSaiKqiT3KdyG7dMJWyj5RHoou": "stepn",
    "3ZatmBQoWaP2b87hAAZFmVZpWjhqsanLXb7qnZFcYf49": "jupiter-exchange-solana",
    GtWrEZvmTbLonQWXfnGyc36c6r9qwtE3yYCPPFzsfgFa: "coin98",
    So11111111111111111111111111111111111111111: "solana",
};
let coinGeckoService;
let shyftService;
function getTokenPriceService() {
    if (!coinGeckoService) {
        coinGeckoService = new CoinGeckoService_1.CoinGeckoService(devnetAddressToCoinGeckoId);
    }
    return coinGeckoService;
}
exports.getTokenPriceService = getTokenPriceService;
function getWalletAssetService() {
    if (!shyftService) {
        shyftService = new ShyftService_1.ShyftService();
    }
    return shyftService;
}
exports.getWalletAssetService = getWalletAssetService;
exports.network = new Network_1.Network();
exports.gasFeeSponsor = new GasFeeSponsor_1.GasFeeSponsor((_a = process.env.GAS_FEE_SPONSOR_PRIVATE_KEY) !== null && _a !== void 0 ? _a : "", exports.network);
