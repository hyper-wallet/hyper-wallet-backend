import * as anchor from "@coral-xyz/anchor";

export const connection = new anchor.web3.Connection(
  "https://little-solitary-bird.solana-devnet.quiknode.pro/d317e9ff361b589b7aa0be479ff11aabd0f524a4/",
  "confirmed"
);
