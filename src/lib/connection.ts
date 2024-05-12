import * as anchor from "@coral-xyz/anchor";
import { clusterApiUrl } from "@solana/web3.js";

export const connection = new anchor.web3.Connection(
  "https://little-solitary-bird.solana-devnet.quiknode.pro/d317e9ff361b589b7aa0be479ff11aabd0f524a4/",
  "confirmed"
);

export const connections = {
  transaction: new anchor.web3.Connection(
    // "https://devnet-rpc.shyft.to?api_key=sFpiJf0Bg2PGfhoI",
    clusterApiUrl("devnet"),
    "confirmed"
  ),
};
