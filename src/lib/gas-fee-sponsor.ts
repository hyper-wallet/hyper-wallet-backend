import { web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { provider } from "./hyper-wallet-program";
// @ts-ignore
import bs58 from "bs58";
const privateKey =
  "Tptte9auYxHzUNki3ACapEMoGbmeubMjm2TV7jx7hDwJptBoiet99o3abNUnDyEDLT9npJhtR5U16Ym1bedm54f";
export const gasFeeSponsor = web3.Keypair.fromSecretKey(
  bs58.decode(privateKey)
);

export async function createSponsoredTx(
  instruction: anchor.web3.TransactionInstruction
) {
  const tx = new anchor.web3.Transaction();
  tx.add(instruction);
  tx.feePayer = gasFeeSponsor.publicKey;
  tx.recentBlockhash = (
    await provider.connection.getRecentBlockhash()
  ).blockhash;
  tx.partialSign(gasFeeSponsor);
  const serializedTx = tx.serialize({
    verifySignatures: true,
    requireAllSignatures: false,
  });
  const base64tx = serializedTx.toString("base64");
  return { base64tx };
}
