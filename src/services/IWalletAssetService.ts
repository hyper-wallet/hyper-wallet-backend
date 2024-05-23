export interface IWalletAssetService {
  getTokenBalances(walletAddress: string): Promise<Map<string, TokenBalance>>;
  getNfts(walletAddress: string): Promise<Nft[]>;
}

export type TokenBalance = {};

export type Nft = {};
