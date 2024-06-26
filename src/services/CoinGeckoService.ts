import { create } from "apisauce";
import {
  ITokenPriceService,
  TokenMarketData,
  TokenPrice,
} from "./ITokenPriceService";

export class CoinGeckoService implements ITokenPriceService {
  private _apisauce;
  private _tokenIdLookupTable: Map<string, string>;

  constructor(tokenIdLookupTable: any) {
    this._tokenIdLookupTable = new Map(Object.entries(tokenIdLookupTable));
    this._apisauce = create({
      baseURL: "https://api.coingecko.com/api/v3/",
      timeout: 5000,
      headers: {
        "x-cg-demo-api-key": "CG-yYM8sWgo2Y6BHg9K5xYaA9ow",
      },
    });
  }

  private createIdByAddressMap(addresses: string[]): Map<string, string> {
    const map = new Map();
    addresses.forEach((address) => {
      map.set(address, this._tokenIdLookupTable.get(address));
    });
    return map;
  }

  async getPricesByAddresses(
    addresses: string[]
  ): Promise<Map<string, TokenPrice>> {
    const idByAddressMap = this.createIdByAddressMap(addresses);
    const tokenPriceByAddressMap = new Map<string, TokenPrice>();
    try {
      const params = {
        ids: Array.from(idByAddressMap.values()).join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true,
      };
      const res = await this._apisauce.get("/simple/price", params);
      console.log("🚀 ~ CoinGeckoService ~ res:", res.data);
      const tokenPriceByIdMap = new Map(
        Object.entries(res.data as unknown as any)
      );
      addresses.forEach((address) => {
        const id = idByAddressMap.get(address) ?? "";
        const price = tokenPriceByIdMap.get(id) as TokenPrice;
        tokenPriceByAddressMap.set(address, price);
      });
    } catch (error) {
      console.log("🚀 ~ CoinGeckoService ~ error:", error);
    } finally {
      return tokenPriceByAddressMap;
    }
  }

  async getMarketDatasByAddresses(
    addresses: string[]
  ): Promise<Map<string, TokenMarketData>> {
    const idByAddressMap = this.createIdByAddressMap(addresses);
    const marketDataByAddressMap = new Map<string, TokenMarketData>();
    try {
      const params = {
        ids: Array.from(idByAddressMap.values()).join(","),
        vs_currency: "usd",
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true,
      };
      const res = await this._apisauce.get("/coins/markets", params);
      const marketDataByIdMap = new Map<string, TokenMarketData>();
      (res.data as any[]).forEach((marketData: any) => {
        marketDataByIdMap.set(marketData.id, marketData);
      });
      addresses.forEach((address) => {
        const id = idByAddressMap.get(address) ?? "";
        const marketData = marketDataByIdMap.get(id) as TokenMarketData;
        marketDataByAddressMap.set(address, marketData);
      });
    } catch (error) {
      console.log("🚀 ~ CoinGeckoService ~ error:", error);
    } finally {
      return marketDataByAddressMap;
    }
  }
}
