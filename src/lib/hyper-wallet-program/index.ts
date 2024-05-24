import * as anchor from "@coral-xyz/anchor";
import idl from "./idl/hyper_wallet_program.json";
import { Program } from "@coral-xyz/anchor";
import { HyperWalletProgram } from "./types/hyper_wallet_program";
import { gasFeeSponsor, network } from "../../services";

const connection = network.connection;
const wallet = new anchor.Wallet(gasFeeSponsor.signer);
const provider = new anchor.AnchorProvider(connection, wallet, {
  preflightCommitment: "confirmed",
  commitment: "processed",
});

export const hyperWalletProgram = new anchor.Program(
  JSON.parse(JSON.stringify(idl)),
  idl.metadata.address,
  provider
) as Program<HyperWalletProgram>;
