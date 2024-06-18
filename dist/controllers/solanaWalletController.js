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
exports.constructTransferNftTx = exports.constructTransferSplTx = exports.constructTransferLamportsTx = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const services_1 = require("../services");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const services_2 = require("../services");
function constructTransferLamportsTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fromAddress, toAddress, lamports } = req.body;
        const tx = new anchor_1.web3.Transaction();
        tx.add(web3_js_1.SystemProgram.transfer({
            fromPubkey: new web3_js_1.PublicKey(fromAddress),
            toPubkey: new web3_js_1.PublicKey(toAddress),
            lamports,
        }));
        tx.feePayer = services_1.gasFeeSponsor.address;
        tx.recentBlockhash = yield services_2.network.getRecentBlockhash();
        tx.partialSign(services_1.gasFeeSponsor.signer);
        const serializedTx = tx.serialize({
            verifySignatures: true,
            requireAllSignatures: false,
        });
        const base64tx = serializedTx.toString("base64");
        res.json({ base64tx });
    });
}
exports.constructTransferLamportsTx = constructTransferLamportsTx;
function constructTransferSplTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fromAddress, toAddress, tokenMintAddress, rawAmount, feeToken } = req.body;
        const fromAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_2.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(tokenMintAddress), new web3_js_1.PublicKey(fromAddress), true);
        const toAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_2.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(tokenMintAddress), new web3_js_1.PublicKey(toAddress), true);
        const tx = new anchor_1.web3.Transaction();
        tx.add((0, spl_token_1.createTransferCheckedInstruction)(fromAta.address, new web3_js_1.PublicKey(tokenMintAddress), toAta.address, new web3_js_1.PublicKey(fromAddress), rawAmount, 6));
        if (feeToken == "USDT") {
            const { base64tx } = yield services_1.gasFeeSponsor.createPayGasFeeWithUsdtTx(tx, fromAddress);
            return res.json({ base64tx });
        }
        else {
            const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
            return res.json({ base64tx });
        }
    });
}
exports.constructTransferSplTx = constructTransferSplTx;
function constructTransferNftTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fromAddress, toAddress, nftMintAddress, feeToken } = req.body;
        const fromAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_2.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(nftMintAddress), new web3_js_1.PublicKey(fromAddress), true);
        const toAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_2.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(nftMintAddress), new web3_js_1.PublicKey(toAddress), true);
        const tx = new anchor_1.web3.Transaction();
        tx.add((0, spl_token_1.createTransferCheckedInstruction)(fromAta.address, new web3_js_1.PublicKey(nftMintAddress), toAta.address, new web3_js_1.PublicKey(fromAddress), 1, // Nft amount
        0 // Nft decimals is always 0
        ));
        if (feeToken == "USDT") {
            const { base64tx } = yield services_1.gasFeeSponsor.createPayGasFeeWithUsdtTx(tx, fromAddress);
            return res.json({ base64tx });
        }
        else {
            const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
            return res.json({ base64tx });
        }
    });
}
exports.constructTransferNftTx = constructTransferNftTx;
