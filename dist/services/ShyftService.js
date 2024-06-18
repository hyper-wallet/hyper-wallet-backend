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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShyftService = void 0;
const js_1 = require("@shyft-to/js");
const node_cache_1 = __importDefault(require("node-cache"));
class ShyftService {
    constructor() {
        this._shyft = new js_1.ShyftSdk({
            apiKey: "sFpiJf0Bg2PGfhoI",
            network: js_1.Network.Devnet,
        });
        this._cache = new node_cache_1.default();
    }
    getTokenBalances(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenBalanceByAddress = new Map();
            try {
                const solBalance = yield this._shyft.wallet.getBalance({
                    network: js_1.Network.Devnet,
                    wallet: walletAddress,
                });
                const solMetadata = {
                    mint_address: "So11111111111111111111111111111111111111111",
                    name: "Solana",
                    symbol: "SOL",
                    image: "https://cdn.lu.ma/solana-coin-icons/SOL.png",
                    decimals: 9,
                };
                this._cache.set(solMetadata.mint_address, solMetadata);
                tokenBalanceByAddress.set(solMetadata.mint_address, {
                    balance: solBalance,
                    metadata: solMetadata,
                });
                const tokenBalances = yield this._shyft.wallet.getAllTokenBalance({
                    wallet: walletAddress,
                });
                tokenBalances.forEach((tokenBalance) => {
                    const { address, balance, info } = tokenBalance;
                    const { name, symbol, image } = info;
                    const metadata = {
                        mint_address: address,
                        name,
                        symbol,
                        image,
                        decimals: 6,
                    };
                    this._cache.set(address, metadata);
                    tokenBalanceByAddress.set(address, {
                        balance,
                        metadata,
                    });
                });
            }
            catch (e) { }
            return tokenBalanceByAddress;
        });
    }
    getNfts(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nfts = (yield this._shyft.nft.getNftsByOwnerV2({
                    owner: walletAddress,
                })).nfts.map((nft) => {
                    this._cache.set(nft.mint, nft);
                    return {
                        metadata: nft,
                    };
                });
                return nfts;
            }
            catch (e) {
                return [];
            }
        });
    }
}
exports.ShyftService = ShyftService;
