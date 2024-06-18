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
exports.Network = void 0;
const web3_js_1 = require("@solana/web3.js");
class Network {
    constructor() {
        this._solanaConnection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
        this._quicknodeConnection = new web3_js_1.Connection("https://little-solitary-bird.solana-devnet.quiknode.pro/d317e9ff361b589b7aa0be479ff11aabd0f524a4/");
        this._shyftConnection = new web3_js_1.Connection("https://devnet-rpc.shyft.to?api_key=sFpiJf0Bg2PGfhoI");
    }
    get connection() {
        return this._solanaConnection;
    }
    getRecentBlockhash() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._solanaConnection.getRecentBlockhash()).blockhash;
        });
    }
}
exports.Network = Network;
