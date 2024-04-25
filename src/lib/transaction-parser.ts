import { getProgramIdl } from "@solanafm/explorer-kit-idls";
import { connection } from "./connection";
import { hyperWalletProgram } from "./hyper-wallet-program";
import idl from "./hyper-wallet-program/idl/hyper_wallet_program.json";
import * as anchor from "@coral-xyz/anchor";
import {
  ParserType,
  SolanaFMParser,
  checkIfInstructionParser,
} from "@solanafm/explorer-kit";
//@ts-ignore
const borshCoder = new anchor.BorshCoder(idl);

export async function getParsedTransaction(signature: string) {
  const tx = await connection.getTransaction(signature);
  if (!tx) return;

  const message = tx.transaction.message;
  const { accountKeys, instructions } = message;
  const ix = instructions[0];
  const programId = accountKeys[ix.programIdIndex];

  if (programId.toString() != hyperWalletProgram.programId.toString()) {
    const SFMIdlItem = await getProgramIdl(programId.toString());
    if (SFMIdlItem) {
      const parser = new SolanaFMParser(SFMIdlItem, programId.toString());
      const instructionParser = parser.createParser(ParserType.INSTRUCTION);

      if (instructionParser && checkIfInstructionParser(instructionParser)) {
        // Parse the transaction
        const decodedData = instructionParser.parseInstructions(ix.data);
        console.log("🚀 ~ getParsedTransaction ~ decodedData:", decodedData);
      }
    }
  } else {
    const decodedIx = borshCoder.instruction.decode(ix.data, "base58");
    const accountMetas = ix.accounts.map((idx) => ({
      pubkey: tx.transaction.message.accountKeys[idx],
      isSigner: tx.transaction.message.isAccountSigner(idx),
      isWritable: tx.transaction.message.isAccountWritable(idx),
    }));
    const formatted = borshCoder.instruction.format(
      //@ts-ignore
      decodedIx,
      accountMetas
    );
    return { name: decodedIx?.name, ...formatted };
  }
}
