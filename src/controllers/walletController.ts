import { Request, Response } from "express";
import { connection } from "../lib/hyper-wallet-program";
import * as anchor from "@coral-xyz/anchor";
import { coinGeckoClient } from "../services";
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
import { cache } from "../lib/cache";
import { SolanaParser } from "@debridge-finance/solana-transaction-parser";
import hyperWalletProgramIdl from "../lib/hyper-wallet-program/idl/hyper_wallet_program.json";
import { connections } from "../lib/connection";

export async function getWalletTokens(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "address is required" });
  }

  let tokenBalanceByCGId = new Map();

  const solBalance =
    (await connection.getBalance(new PublicKey(address))) / LAMPORTS_PER_SOL;
  const solMetadata = {
    mint_address: "So11111111111111111111111111111111111111111",
    name: "Solana",
    symbol: "SOL",
    image: "https://cdn.lu.ma/solana-coin-icons/SOL.png",
    decimals: 9,
  };
  cache.set(solMetadata.mint_address, solMetadata);
  tokenBalanceByCGId.set("solana", {
    balance: solBalance,
    metadata: solMetadata,
  });

  const tokenBalances = await shyft.wallet.getAllTokenBalance({
    wallet: address.toString(),
  });
  tokenBalances.forEach((tokenBalance) => {
    const { address, balance, info } = tokenBalance;
    const { name, symbol, image } = info;
    const metadata = {
      mint_address: address,
      name,
      symbol,
      image,
      decimals: 6,
    };
    cache.set(address, metadata);
    tokenBalanceByCGId.set(getCoinGeckoId(address), {
      balance,
      metadata,
    });
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
    cache.set(nft.mint, nft);
    return {
      metadata: nft,
    };
  });

  res.json({ nfts });
}

export async function getWalletTransactions(req: Request, res: Response) {
  const { address } = req.query;
  console.log("🚀 ~ getWalletTransactions ~ address:", address);
  if (!address) {
    return res.json({ error: "Address is required" });
  }

  const signatures_1 = await connections.transaction.getSignaturesForAddress(
    new PublicKey(address),
    { limit: 10 }
  );
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
  const signatures_2 = await connections.transaction.getSignaturesForAddress(
    new PublicKey(address),
    { limit: 10, before: signatures_1[9].signature }
  );
  const transactions_1 = await getParsedTransactions(signatures_1);
  const transactions_2 = await getParsedTransactions(signatures_2);
  res.json({ transactions: [...transactions_1, ...transactions_2] });
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

async function getParsedTransactions(signatures: any[]) {
  const txParser = new SolanaParser([
    {
      idl: hyperWalletProgramIdl as unknown as anchor.Idl,
      programId: "HYPERhd7VFrTzbRLyGsRcGQZkSfaKUGKAY8XDbaY5AgL",
    },
  ]);
  const promises = signatures.map(async (signature, i) => {
    try {
      const parsed = (await txParser.parseTransaction(
        connections.transaction,
        signature.signature,
        false
      )) ?? [{}];
      const res = {
        ...signature,
        ...parsed[0],
      };
      return res;
    } catch {
      return null;
    }
  });
  const transactions = await Promise.all(promises);
  return transactions;
}
