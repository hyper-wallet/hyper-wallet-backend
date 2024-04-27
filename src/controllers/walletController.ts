import { Request, Response } from "express";
import { connection, hyperWalletProgram } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import { coinGeckoClient } from "../services";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { getCoinGeckoId } from "../lib/utils";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  TokenStandard,
  fetchAllDigitalAssetByOwner,
  fetchJsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "../lib/umi";
import { publicKey, unwrapOption } from "@metaplex-foundation/umi";
import { shyft } from "../services/shyft";

export async function getWalletTokens(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  let tokenBalanceByCGId = new Map();

  const tokenBalances = await shyft.wallet.getAllTokenBalance({
    wallet: address.toString(),
  });
  tokenBalances.forEach((tokenBalance) => {
    const { address, balance, info } = tokenBalance;
    const { name, symbol, image } = info;
    tokenBalanceByCGId.set(getCoinGeckoId(address), {
      balance,
      metadata: {
        mint_address: address,
        name,
        symbol,
        image,
        decimals: 6,
      },
    });
  });

  const solBalance =
    (await connection.getBalance(new PublicKey(address))) / LAMPORTS_PER_SOL;
  tokenBalanceByCGId.set("solana", {
    balance: solBalance,
    metadata: {
      mint_address: "So11111111111111111111111111111111111111111",
      name: "Solana",
      symbol: "SOL",
      image: "",
      decimals: 9,
    },
  });

  const coinGeckoIds = Array.from(tokenBalanceByCGId.keys());
  const tokenPriceByCGId = await coinGeckoClient.getCoinPriceByIds(
    coinGeckoIds
  );

  const tokens = Array.from(tokenBalanceByCGId.keys()).map((cgId: any) => {
    const balance = tokenBalanceByCGId.get(cgId);
    const price = tokenPriceByCGId.get(cgId);
    return {
      ...balance,
      price,
    };
  });

  res.json({ tokens });
}

export async function getWalletNfts(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  const nfts = (
    await shyft.nft.getNftsByOwnerV2({
      owner: address.toString(),
    })
  ).nfts.map((nft) => {
    return {
      metadata: nft,
    };
  });

  res.json({ nfts });
}

export async function getWalletTransactions(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "Address is required" });
  }

  const transactions = await shyft.wallet.parsedTransactionHistory({
    wallet: address.toString(),
  });

  res.json({ transactions });
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

export async function getTransactions(req: Request, res: Response) {
  const { address, limit, beforeTxSignature } = req.query;
  if (!address) {
    return res.json({ error: "Address is required" });
  }
  if (!!limit && isNaN(parseInt(limit.toString()))) {
    return res.json({ error: "Invalid limit" });
  }

  const transactions = await shyft.wallet.transactionHistory({
    wallet: address?.toString(),
    limit: limit ? parseInt(limit.toString()) : undefined,
    beforeTxSignature: beforeTxSignature?.toString(),
  });

  res.json({ transactions });
}
