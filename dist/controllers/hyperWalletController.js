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
exports.constructHyperTransferNftTx = exports.constructHyperTransferSplTx = exports.constructHyperTransferLamportsTx = exports.constructCloseHyperWalletTx = exports.constructCreateHyperWalletTx = exports.getHyperWalletAccount = void 0;
const hyper_wallet_program_1 = require("../lib/hyper-wallet-program");
const anchor_1 = require("@coral-xyz/anchor");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const services_1 = require("../services");
const USDT_MINT_ADDRESS = "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a";
function getHyperWalletAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { address } = req.query;
        if (!address) {
            return res.json({ error: "address is required" });
        }
        const hyperWalletAccount = yield hyper_wallet_program_1.hyperWalletProgram.account.hyperWallet.fetchNullable(new anchor_1.web3.PublicKey(address));
        res.json({ hyperWalletAccount });
    });
}
exports.getHyperWalletAccount = getHyperWalletAccount;
function constructCreateHyperWalletTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, ownerAddress } = req.body;
        const tx = new anchor_1.web3.Transaction();
        tx.add(yield hyper_wallet_program_1.hyperWalletProgram.methods
            .createHyperWallet()
            .accounts({
            hyperWallet: hyperWalletPda,
            owner: ownerAddress,
        })
            .instruction());
        tx.feePayer = services_1.gasFeeSponsor.address;
        tx.recentBlockhash = yield services_1.network.getRecentBlockhash();
        tx.partialSign(services_1.gasFeeSponsor.signer);
        const serializedTx = tx.serialize({
            verifySignatures: true,
            requireAllSignatures: false,
        });
        const base64tx = serializedTx.toString("base64");
        res.json({ base64tx });
    });
}
exports.constructCreateHyperWalletTx = constructCreateHyperWalletTx;
function constructCloseHyperWalletTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, ownerAddress } = req.body;
        const tx = new anchor_1.web3.Transaction();
        tx.add(yield hyper_wallet_program_1.hyperWalletProgram.methods
            .closeHyperWallet()
            .accounts({
            hyperWallet: hyperWalletPda,
            owner: ownerAddress,
        })
            .instruction());
        tx.feePayer = services_1.gasFeeSponsor.address;
        tx.recentBlockhash = yield services_1.network.getRecentBlockhash();
        tx.partialSign(services_1.gasFeeSponsor.signer);
        const serializedTx = tx.serialize({
            verifySignatures: true,
            requireAllSignatures: false,
        });
        const base64tx = serializedTx.toString("base64");
        res.json({ base64tx });
    });
}
exports.constructCloseHyperWalletTx = constructCloseHyperWalletTx;
function constructHyperTransferLamportsTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fromHyperPda, hyperOwnerAddress, toAddress, lamports, otpHash, proofHash, } = req.body;
        const tx = new anchor_1.web3.Transaction();
        tx.add(yield hyper_wallet_program_1.hyperWalletProgram.methods
            .transferLamports({
            lamports: new anchor_1.BN(lamports),
            otpHash,
            proofHash,
        })
            .accounts({
            fromHyperWallet: fromHyperPda,
            hyperWalletOwner: hyperOwnerAddress,
            to: toAddress,
        })
            .instruction());
        tx.feePayer = services_1.gasFeeSponsor.address;
        tx.recentBlockhash = yield services_1.network.getRecentBlockhash();
        tx.partialSign(services_1.gasFeeSponsor.signer);
        const serializedTx = tx.serialize({
            verifySignatures: true,
            requireAllSignatures: false,
        });
        const base64tx = serializedTx.toString("base64");
        res.json({ base64tx });
    });
}
exports.constructHyperTransferLamportsTx = constructHyperTransferLamportsTx;
function constructHyperTransferSplTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fromHyperWalletPda, hyperWalletOwnerAddress, toAddress, tokenMintAddress, rawAmount, otpHash, proofHash, feeToken, } = req.body;
        const fromHyperWalletAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_1.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(tokenMintAddress), new web3_js_1.PublicKey(fromHyperWalletPda), true);
        const toAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_1.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(tokenMintAddress), new web3_js_1.PublicKey(toAddress), true);
        const tx = new anchor_1.web3.Transaction();
        tx.add(yield hyper_wallet_program_1.hyperWalletProgram.methods
            .transferSpl({
            rawAmount: new anchor_1.BN(rawAmount),
            otpHash: [...Buffer.from(otpHash.data)],
            //@ts-ignore
            proofHash: [...proofHash.map((v) => [...Buffer.from(v.data)])],
        })
            .accounts({
            fromHyperWalletAta: fromHyperWalletAta.address,
            fromHyperWallet: fromHyperWalletPda,
            hyperWalletOwner: hyperWalletOwnerAddress,
            to: toAddress,
            toAta: toAta.address,
        })
            .instruction());
        if (feeToken == "usdt") {
            const gasFeeSponsorUsdtAta = yield services_1.gasFeeSponsor.getUsdtAta();
            const hyperWalletUsdtAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_1.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(USDT_MINT_ADDRESS), new web3_js_1.PublicKey(fromHyperWalletPda), true);
            tx.add(yield hyper_wallet_program_1.hyperWalletProgram.methods
                .transferSpl({
                rawAmount: new anchor_1.BN(0.000015 * Math.pow(10, 6)),
                otpHash: [...Buffer.from(otpHash.data)],
                //@ts-ignore
                proofHash: [...proofHash.map((v) => [...Buffer.from(v.data)])],
            })
                .accounts({
                fromHyperWalletAta: hyperWalletUsdtAta.address,
                fromHyperWallet: fromHyperWalletPda,
                hyperWalletOwner: hyperWalletOwnerAddress,
                to: services_1.gasFeeSponsor.address,
                toAta: gasFeeSponsorUsdtAta.address,
            })
                .instruction());
        }
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructHyperTransferSplTx = constructHyperTransferSplTx;
function constructHyperTransferNftTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const TRANSFER_NFT_RAW_AMOUNT = 1; // There's only 1 nft per mint address
        const { fromHyperWalletPda, hyperWalletOwnerAddress, toAddress, nftMintAddress, otpHash, proofHash, feeToken, } = req.body;
        const fromHyperWalletAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_1.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(nftMintAddress), new web3_js_1.PublicKey(fromHyperWalletPda), true);
        const toAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_1.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(nftMintAddress), new web3_js_1.PublicKey(toAddress), true);
        const tx = new anchor_1.web3.Transaction();
        tx.add(yield hyper_wallet_program_1.hyperWalletProgram.methods
            .transferSpl({
            rawAmount: new anchor_1.BN(TRANSFER_NFT_RAW_AMOUNT),
            otpHash,
            proofHash,
        })
            .accounts({
            fromHyperWalletAta: fromHyperWalletAta.address,
            fromHyperWallet: fromHyperWalletPda,
            hyperWalletOwner: hyperWalletOwnerAddress,
            to: toAddress,
            toAta: toAta.address,
        })
            .instruction());
        if (feeToken == "usdt") {
            const gasFeeSponsorUsdtAta = yield services_1.gasFeeSponsor.getUsdtAta();
            const hyperWalletUsdtAta = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(services_1.network.connection, services_1.gasFeeSponsor.signer, new web3_js_1.PublicKey(USDT_MINT_ADDRESS), new web3_js_1.PublicKey(fromHyperWalletPda), true);
            tx.add(yield hyper_wallet_program_1.hyperWalletProgram.methods
                .transferSpl({
                rawAmount: new anchor_1.BN(0.000015 * Math.pow(10, 6)),
                otpHash: [...Buffer.from(otpHash.data)],
                //@ts-ignore
                proofHash: [...proofHash.map((v) => [...Buffer.from(v.data)])],
            })
                .accounts({
                fromHyperWalletAta: hyperWalletUsdtAta.address,
                fromHyperWallet: fromHyperWalletPda,
                hyperWalletOwner: hyperWalletOwnerAddress,
                to: services_1.gasFeeSponsor.address,
                toAta: gasFeeSponsorUsdtAta.address,
            })
                .instruction());
        }
        const base64tx = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructHyperTransferNftTx = constructHyperTransferNftTx;
