import { publicKey, unwrapOption } from "@metaplex-foundation/umi";
import { umi } from "./lib/umi";
import { PublicKey } from "@solana/web3.js";
import {
  TokenStandard,
  fetchAllDigitalAssetByOwner,
  fetchDigitalAsset,
  fetchJsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { connection } from "./lib/connection";
import { shyft } from "./services/shyft";

export async function test() {
  const tokenBalance = await shyft.wallet.collections({
    wallet: "Csg6zEgfihsi25RuJkd9M2YjENzLiYya34ZfQmr9fScb",
  });
  console.log("🚀 ~ test ~ tokenBalance:", JSON.stringify(tokenBalance));
}
