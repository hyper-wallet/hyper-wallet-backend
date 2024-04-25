import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { clusterApiUrl } from "@solana/web3.js";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

export const umi = createUmi(clusterApiUrl("devnet"))
  .use(dasApi())
  .use(mplTokenMetadata());
