import { Network, ShyftSdk } from "@shyft-to/js";
import { IWalletAssetService, TokenBalance } from "./IWalletAssetService";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import NodeCache from "node-cache";

export class ShyftService implements IWalletAssetService {
  private _shyft: ShyftSdk;
  private _cache: NodeCache;

  constructor() {
    this._shyft = new ShyftSdk({
      apiKey: "sFpiJf0Bg2PGfhoI",
      network: Network.Devnet,
    });
    this._cache = new NodeCache();
  }

  async getTokenBalances(
    walletAddress: string
  ): Promise<Map<string, TokenBalance>> {
    const tokenBalanceByAddress = new Map();
    try {
      const solBalance =
        (await this._shyft.wallet.getBalance({
          network: Network.Devnet,
          wallet: walletAddress,
        })) / LAMPORTS_PER_SOL;
      const solMetadata = {
        mint_address: "So11111111111111111111111111111111111111111",
        name: "Solana",
        symbol: "SOL",
        image: "https://cdn.lu.ma/solana-coin-icons/SOL.png",
        decimals: 9,
      };
      this._cache.set(solMetadata.mint_address, solMetadata);
      tokenBalanceByAddress.set(solMetadata.mint_address, {
        balance: solBalance,
        metadata: solMetadata,
      });

      const tokenBalances = await this._shyft.wallet.getAllTokenBalance({
        wallet: walletAddress,
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
        this._cache.set(address, metadata);
        tokenBalanceByAddress.set(address, {
          balance,
          metadata,
        });
      });
    } catch (e) {}
    return tokenBalanceByAddress;
  }

  async getNfts(walletAddress: string) {
    try {
      const nfts = (
        await this._shyft.nft.getNftsByOwnerV2({
          owner: walletAddress,
        })
      ).nfts.map((nft) => {
        this._cache.set(nft.mint, nft);
        return {
          metadata: nft,
        };
      });
      return nfts;
    } catch (e) {
      return [];
    }
  }
}
