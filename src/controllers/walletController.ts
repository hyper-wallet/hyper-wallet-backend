import { Request, Response } from "express";
import { connection, hyperWalletProgram } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import { coinGeckoClient } from "../services";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { getCoinGeckoId } from "../lib/utils";
import { PublicKey } from "@solana/web3.js";
import {
  TokenStandard,
  fetchAllDigitalAssetByOwner,
  fetchJsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "../lib/umi";
import { publicKey, unwrapOption } from "@metaplex-foundation/umi";

export async function getBalances(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  const tokenAccounts = (
    await connection.getParsedTokenAccountsByOwner(
      new anchor.web3.PublicKey(address),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    )
  ).value;
  let map = new Map();
  tokenAccounts.forEach((tokenAccount) => {
    const balance =
      tokenAccount.account.data.parsed["info"]["tokenAmount"]["amount"];
    const mint = tokenAccount.account.data.parsed["info"]["mint"];
    map.set(getCoinGeckoId(mint), {
      balance,
      mint_address: mint,
      decimals: 6,
    });
  });
  const lamportsBalance = await connection.getBalance(new PublicKey(address));
  map.set("solana", {
    balance: lamportsBalance,
    mint_address: "So11111111111111111111111111111111111111111",
    decimals: 9,
  });
  const coinGeckoIds = Array.from(map.keys());
  const tokenData = await coinGeckoClient.getCoinDataByIds(coinGeckoIds);
  const tokenBalances = tokenData.map((tokenData: any) => {
    return {
      ...tokenData,
      ...map.get(tokenData.id),
    };
  });
  res.json({ tokenBalances });
}

export async function getFungibleAssetsByOwner(req: Request, res: Response) {
  const { address } = req.params;
  if (!address) {
    res.json({ error: "Address is required" });
  }
  const fungibleAssets = (
    await fetchAllDigitalAssetByOwner(umi, publicKey(address))
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
  res.json({
    fungibleAssets: fungibleAssetsWithJsonMetadata,
  });
}

export async function getNonFungibleAssetsByOwner(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "Address is required" });
  }

  const nonFungibleAssets = (
    await fetchAllDigitalAssetByOwner(umi, publicKey(address.toString()))
  )
    .filter((asset) => {
      const { tokenStandard } = asset.metadata;
      return unwrapOption(tokenStandard) == TokenStandard.NonFungible;
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

  const nonFungibleAssetsWithJsonMetadata = await Promise.all(
    nonFungibleAssets.map(async (asset) => {
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
  res.json({
    nonFungibleAssets: nonFungibleAssetsWithJsonMetadata,
  });
}

//@ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};
