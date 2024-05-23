export interface ITokenPriceService {
  getPricesByAddresses(addresses: string[]): Promise<Map<string, TokenPrice>>;
}

export type TokenPrice = {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  last_updated_at: number;
};
