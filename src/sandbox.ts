import { publicKey, unwrapOption } from "@metaplex-foundation/umi";
import { umi } from "./lib/umi";
import { PublicKey } from "@solana/web3.js";
import {
  TokenStandard,
  fetchAllDigitalAssetByOwner,
  fetchDigitalAsset,
  fetchJsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

export async function test() {
  //   const assets = await umi.rpc.getAssetsByOwner({
  //     owner: publicKey("Csg6zEgfihsi25RuJkd9M2YjENzLiYya34ZfQmr9fScb"),
  //     limit: 10,
  //   });
  //   console.log(JSON.stringify(assets.items));
  const fungibleAssets = (
    await fetchAllDigitalAssetByOwner(
      umi,
      publicKey("Csg6zEgfihsi25RuJkd9M2YjENzLiYya34ZfQmr9fScb")
    )
  )
    .filter((asset) => {
      const { tokenStandard } = asset.metadata;
      return unwrapOption(tokenStandard) == TokenStandard.Fungible;
    })
    .map((asset) => {
      const { mint, metadata } = asset;
      const { publicKey: mintPublicKey, supply, decimals } = mint;
      const { publicKey: metadataPublicKey, uri, name, symbol } = metadata;
      return {
        mint: {
          publicKey: mintPublicKey,
          supply,
          decimals,
        },
        metadata: {
          publicKey: metadataPublicKey,
          uri,
          name,
          symbol,
        },
      };
    });
  const fungibleAssetsWithJsonMetadata = await Promise.all(
    fungibleAssets.map(async (asset) => {
      const { mint, metadata } = asset;
      const jsonMetadata = await fetchJsonMetadata(umi, asset.metadata.uri);
      return {
        mint,
        metadata: {
          ...metadata,
          ...jsonMetadata,
        },
      };
    })
  );
  console.log(fungibleAssetsWithJsonMetadata);
}
