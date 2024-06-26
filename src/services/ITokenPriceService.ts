export interface ITokenPriceService {
  getPricesByAddresses(addresses: string[]): Promise<Map<string, TokenPrice>>;
  getMarketDatasByAddresses(
    addresses: string[]
  ): Promise<Map<string, TokenMarketData>>;
}

export type TokenPrice = {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  last_updated_at: number;
};

export type TokenMarketData = {
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  total_supply: number;
};
