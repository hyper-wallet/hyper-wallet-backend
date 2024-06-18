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
exports.GasFeeSponsor = void 0;
const bytes_1 = require("@coral-xyz/anchor/dist/cjs/utils/bytes");
const anchor_1 = require("@coral-xyz/anchor");
const spl_token_1 = require("@solana/spl-token");
const USDT_MINT_ADDRESS = "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a";
class GasFeeSponsor {
    constructor(privateKey, network) {
        this._signer = anchor_1.web3.Keypair.fromSecretKey(bytes_1.bs58.decode(privateKey));
        this._network = network;
    }
    get address() {
        return this._signer.publicKey;
    }
    get signer() {
        return this._signer;
    }
    getUsdtAta() {
        return __awaiter(this, void 0, void 0, function* () {
            const ata = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(this._network.connection, this._signer, new anchor_1.web3.PublicKey(USDT_MINT_ADDRESS), new anchor_1.web3.PublicKey(this.address), true);
            return ata;
        });
    }
    createFullySponsoredTx(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            tx.feePayer = this.address;
            tx.recentBlockhash = yield this._network.getRecentBlockhash();
            tx.partialSign(this._signer);
            const serializedTx = tx.serialize({
                verifySignatures: true,
                requireAllSignatures: false,
            });
            const base64tx = serializedTx.toString("base64");
            return { base64tx };
        });
    }
    createPayGasFeeWithUsdtTx(tx, sponsoredAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const fromAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(this._network.connection, this._signer, new anchor_1.web3.PublicKey(USDT_MINT_ADDRESS), new anchor_1.web3.PublicKey(sponsoredAddress), true);
            const toAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(this._network.connection, this._signer, new anchor_1.web3.PublicKey(USDT_MINT_ADDRESS), this.address, true);
            const payGasFeeWithUsdtIx = (0, spl_token_1.createTransferCheckedInstruction)(fromAta.address, new anchor_1.web3.PublicKey(USDT_MINT_ADDRESS), toAta.address, new anchor_1.web3.PublicKey(sponsoredAddress), 0.000015 * Math.pow(10, 6), 6);
            tx.add(payGasFeeWithUsdtIx);
            tx.feePayer = this.address;
            tx.recentBlockhash = yield this._network.getRecentBlockhash();
            tx.partialSign(this._signer);
            const serializedTx = tx.serialize({
                verifySignatures: true,
                requireAllSignatures: false,
            });
            const base64tx = serializedTx.toString("base64");
            return { base64tx };
        });
    }
}
exports.GasFeeSponsor = GasFeeSponsor;
