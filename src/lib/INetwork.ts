import { Connection } from "@solana/web3.js";

export interface INetwork {
  get connection(): Connection;
  getRecentBlockhash(): Promise<string>;
}
