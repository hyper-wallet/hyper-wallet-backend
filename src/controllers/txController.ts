import * as anchor from "@coral-xyz/anchor";
import {hyperWalletProgram, provider} from "../lib/hyper-wallet-program";
import {gasFeeSponsor} from "../lib/gas-fee-sponsor";
import {Request, Response} from "express";

export const constructCreateHyperWalletTx = async (req: Request, res: Response) => {
    const {hyperWalletPDA, owner} = req.body;
    const tx = new anchor.web3.Transaction();
    tx.add(
        await hyperWalletProgram.methods.createHyperWallet().accounts({
            hyperWallet: hyperWalletPDA,
            owner: owner
        }).instruction()
    );
    tx.feePayer = gasFeeSponsor.publicKey;
    tx.recentBlockhash = (await provider.connection.getRecentBlockhash()).blockhash;
    tx.partialSign(gasFeeSponsor);
    const serializedTx = tx.serialize({
        verifySignatures: true,
        requireAllSignatures: false
    });
    const base64tx = serializedTx.toString("base64");
    res.json({base64tx});
}
