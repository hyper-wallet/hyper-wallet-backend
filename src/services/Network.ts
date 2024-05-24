import { Connection, clusterApiUrl } from "@solana/web3.js";
import { INetwork } from "./INetwork";

export class Network implements INetwork {
  private _solanaConnection: Connection;
  private _quicknodeConnection: Connection;
  private _shyftConnection: Connection;

  constructor() {
    this._solanaConnection = new Connection(clusterApiUrl("devnet"));
    this._quicknodeConnection = new Connection(
      "https://little-solitary-bird.solana-devnet.quiknode.pro/d317e9ff361b589b7aa0be479ff11aabd0f524a4/"
    );
    this._shyftConnection = new Connection(
      "https://devnet-rpc.shyft.to?api_key=sFpiJf0Bg2PGfhoI"
    );
  }

  get connection() {
    return this._solanaConnection;
  }

  async getRecentBlockhash(): Promise<string> {
    return (await this._solanaConnection.getRecentBlockhash()).blockhash;
  }
}
