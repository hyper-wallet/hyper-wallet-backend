import { Connection } from "@solana/web3.js";
import { INetwork } from "./INetwork";

export class Network implements INetwork {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  get connection() {
    return this._connection;
  }

  async getRecentBlockhash(): Promise<string> {
    return (await this._connection.getRecentBlockhash()).blockhash;
  }
}
