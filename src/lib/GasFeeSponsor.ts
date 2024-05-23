import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { INetwork } from "./INetwork";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { web3 } from "@coral-xyz/anchor";
import {
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { Network } from "./Network";

export class GasFeeSponsor {
  private _signer: Keypair;
  private _network: INetwork;

  constructor(privateKey: string, network: INetwork) {
    this._signer = Keypair.fromSecretKey(bs58.decode(privateKey));
    this._network = network;
  }

  get address() {
    return this._signer.publicKey;
  }

  async createFullySponsoredTx(instruction: web3.TransactionInstruction) {
    const tx = new web3.Transaction();
    tx.add(instruction);
    tx.feePayer = this.address;
    tx.recentBlockhash = await this._network.getRecentBlockhash();
    tx.partialSign(this._signer);
    const serializedTx = tx.serialize({
      verifySignatures: true,
      requireAllSignatures: false,
    });
    const base64tx = serializedTx.toString("base64");
    return { base64tx };
  }

  async createPayGasFeeWithUsdtTx(
    instruction: web3.TransactionInstruction,
    sponsoredAddress: string
  ) {
    const USDT_MINT_ADDRESS = "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a";
    const fromAta = await getOrCreateAssociatedTokenAccount(
      this._network.connection,
      this._signer,
      new web3.PublicKey(USDT_MINT_ADDRESS),
      new web3.PublicKey(sponsoredAddress),
      true
    );
    const toAta = await getOrCreateAssociatedTokenAccount(
      this._network.connection,
      this._signer,
      new web3.PublicKey(USDT_MINT_ADDRESS),
      this.address,
      true
    );
    const tx = new web3.Transaction();
    const payGasFeeWithUsdtIx = createTransferCheckedInstruction(
      fromAta.address,
      new web3.PublicKey(USDT_MINT_ADDRESS),
      toAta.address,
      new web3.PublicKey(sponsoredAddress),
      0.000015 * Math.pow(10, 6),
      6
    );
    tx.add(payGasFeeWithUsdtIx);
    tx.add(instruction);
    tx.feePayer = this.address;
    tx.recentBlockhash = await this._network.getRecentBlockhash();
    tx.partialSign(this._signer);
    const serializedTx = tx.serialize({
      verifySignatures: true,
      requireAllSignatures: false,
    });
    const base64tx = serializedTx.toString("base64");
    return { base64tx };
  }
}

const network = new Network(new Connection(clusterApiUrl("devnet")));

export const getFeeSponsor = new GasFeeSponsor(
  process.env.GAS_FEE_SPONSOR_PRIVATE_KEY ?? "",
  network
);
