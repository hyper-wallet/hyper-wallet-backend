import * as anchor from "@coral-xyz/anchor";
import { CONFIG } from "../../config/config";
import idl from "./idl/hyper_wallet_program.json";
import { Program } from "@coral-xyz/anchor";
import { HyperWalletProgram } from "./types/hyper_wallet_program";
import { gasFeeSponsor } from "../gas-fee-sponsor";

export const connection = new anchor.web3.Connection(
  CONFIG.CLUSTER_URL,
  "confirmed"
);
const wallet = new anchor.Wallet(gasFeeSponsor);
export const provider = new anchor.AnchorProvider(connection, wallet, {
  preflightCommitment: "confirmed",
  commitment: "processed",
});
export const hyperWalletProgram = new anchor.Program(
  JSON.parse(JSON.stringify(idl)),
  idl.metadata.address,
  provider
) as Program<HyperWalletProgram>;
