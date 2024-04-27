import { create } from "apisauce";

export class CoinGeckoClient {
  private _apisauce;
  constructor() {
    this._apisauce = create({
      baseURL: "https://api.coingecko.com/api/v3/",
      timeout: 5000,
      headers: {
        "x-cg-demo-api-key": "CG-yYM8sWgo2Y6BHg9K5xYaA9ow",
      },
    });
  }

  async ping() {
    const res = await this._apisauce.get("/ping");
  }

  async getCoinDataByIds(ids: string[]): Promise<any> {
    const params = {
      ids: ids.join(","),
      vs_currency: "usd",
    };
    const res = await this._apisauce.get("/coins/markets", params);
    return res.data;
  }
  async getCoinPriceByIds(ids: string[]): Promise<any> {
    const params = {
      ids: ids.join(","),
      vs_currencies: "usd",
      include_market_cap: true,
      include_24hr_vol: true,
      include_24hr_change: true,
    };
    const res = await this._apisauce.get("/simple/price", params);
    return new Map(Object.entries(res.data as unknown as any));
  }
}

export const coinGeckoClient = new CoinGeckoClient();
