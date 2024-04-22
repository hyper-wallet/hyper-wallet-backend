import {web3} from "@coral-xyz/anchor";
// @ts-ignore
import bs58 from "bs58";
const privateKey = "Tptte9auYxHzUNki3ACapEMoGbmeubMjm2TV7jx7hDwJptBoiet99o3abNUnDyEDLT9npJhtR5U16Ym1bedm54f";
export const gasFeeSponsor = web3.Keypair.fromSecretKey(bs58.decode(privateKey));
