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
    console.log(res.data);
  }

  async getCoinDataByIds(ids: string[]): Promise<any> {
    const params = {
      ids: ids.join(","),
      vs_currency: "usd",
    };
    const res = await this._apisauce.get("/coins/markets", params);
    return res.data;
  }
}

export const coinGeckoClient = new CoinGeckoClient();
