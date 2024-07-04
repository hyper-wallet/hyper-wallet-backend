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
exports.constructRemoveFromWhitelistTx = exports.constructAddToWhitelistTx = exports.constructDisableWhitelistTx = exports.constructEnableWhitelistTx = void 0;
const hyper_wallet_program_1 = require("../lib/hyper-wallet-program");
const anchor_1 = require("@coral-xyz/anchor");
const services_1 = require("../services");
function constructEnableWhitelistTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, hyperWalletOwnerAddress, approverAddress } = req.body;
        const tx = yield hyper_wallet_program_1.hyperWalletProgram.methods
            .enableWhitelist()
            .accounts({
            hyperWallet: hyperWalletPda,
            owner: hyperWalletOwnerAddress,
            approver: approverAddress,
        })
            .transaction();
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructEnableWhitelistTx = constructEnableWhitelistTx;
function constructDisableWhitelistTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, hyperWalletOwnerAddress, approverAddress } = req.body;
        const tx = yield hyper_wallet_program_1.hyperWalletProgram.methods
            .disableWhitelist()
            .accounts({
            hyperWallet: hyperWalletPda,
            owner: hyperWalletOwnerAddress,
            approver: approverAddress,
        })
            .transaction();
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructDisableWhitelistTx = constructDisableWhitelistTx;
function constructAddToWhitelistTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, hyperWalletOwnerAddress, addressToBeAdded, approverAddress, } = req.body;
        const tx = yield hyper_wallet_program_1.hyperWalletProgram.methods
            .addToWhitelist(new anchor_1.web3.PublicKey(addressToBeAdded))
            .accounts({
            hyperWallet: hyperWalletPda,
            owner: hyperWalletOwnerAddress,
            approver: approverAddress,
        })
            .transaction();
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructAddToWhitelistTx = constructAddToWhitelistTx;
function constructRemoveFromWhitelistTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, hyperWalletOwnerAddress, addressToBeRemoved, approverAddress, } = req.body;
        const tx = yield hyper_wallet_program_1.hyperWalletProgram.methods
            .removeFromWhitelist(new anchor_1.web3.PublicKey(addressToBeRemoved))
            .accounts({
            hyperWallet: hyperWalletPda,
            owner: hyperWalletOwnerAddress,
            approver: approverAddress,
        })
            .transaction();
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructRemoveFromWhitelistTx = constructRemoveFromWhitelistTx;
