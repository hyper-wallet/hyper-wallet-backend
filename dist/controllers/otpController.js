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
exports.constructDisableOtpTx = exports.constructEnableOtpTx = exports.constructSetupOtpTx = void 0;
const hyper_wallet_program_1 = require("../lib/hyper-wallet-program");
const services_1 = require("../services");
function constructSetupOtpTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, hyperWalletOwnerAddress, initTime, root } = req.body;
        const tx = yield hyper_wallet_program_1.hyperWalletProgram.methods
            .setUpOtp({
            initTime,
            root: [...Buffer.from(root.data)],
        })
            .accounts({
            hyperWallet: hyperWalletPda,
            hyperWalletOwner: hyperWalletOwnerAddress,
        })
            .transaction();
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructSetupOtpTx = constructSetupOtpTx;
function constructEnableOtpTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;
        const tx = yield hyper_wallet_program_1.hyperWalletProgram.methods
            .enableOtp()
            .accounts({
            hyperWallet: hyperWalletPda,
            hyperWalletOwner: hyperWalletOwnerAddress,
        })
            .transaction();
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructEnableOtpTx = constructEnableOtpTx;
function constructDisableOtpTx(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hyperWalletPda, hyperWalletOwnerAddress } = req.body;
        const tx = yield hyper_wallet_program_1.hyperWalletProgram.methods
            .disableOtp()
            .accounts({
            hyperWallet: hyperWalletPda,
            hyperWalletOwner: hyperWalletOwnerAddress,
        })
            .transaction();
        const { base64tx } = yield services_1.gasFeeSponsor.createFullySponsoredTx(tx);
        res.json({ base64tx });
    });
}
exports.constructDisableOtpTx = constructDisableOtpTx;
