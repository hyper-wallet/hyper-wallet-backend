"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinGeckoService = void 0;
const apisauce_1 = require("apisauce");
class CoinGeckoService {
    constructor(tokenIdLookupTable) {
        this._tokenIdLookupTable = new Map(Object.entries(tokenIdLookupTable));
        this._apisauce = (0, apisauce_1.create)({
            baseURL: "https://api.coingecko.com/api/v3/",
            timeout: 5000,
            headers: {
                "x-cg-demo-api-key": "CG-yYM8sWgo2Y6BHg9K5xYaA9ow",
            },
        });
    }
    createIdByAddressMap(addresses) {
        const map = new Map();
        addresses.forEach((address) => {
            map.set(address, this._tokenIdLookupTable.get(address));
        });
        return map;
    }
    getPricesByAddresses(addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const idByAddressMap = this.createIdByAddressMap(addresses);
            const tokenPriceByAddressMap = new Map();
            try {
                const params = {
                    ids: Array.from(idByAddressMap.values()).join(","),
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_vol: true,
                    include_24hr_change: true,
                };
                const res = yield this._apisauce.get("/simple/price", params);
                console.log("🚀 ~ CoinGeckoService ~ res:", res.data);
                const tokenPriceByIdMap = new Map(Object.entries(res.data));
                addresses.forEach((address) => {
                    var _a;
                    const id = (_a = idByAddressMap.get(address)) !== null && _a !== void 0 ? _a : "";
                    const price = tokenPriceByIdMap.get(id);
                    tokenPriceByAddressMap.set(address, price);
                });
            }
            catch (error) {
                console.log("🚀 ~ CoinGeckoService ~ error:", error);
            }
            finally {
                return tokenPriceByAddressMap;
            }
        });
    }
    getMarketDatasByAddresses(addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const idByAddressMap = this.createIdByAddressMap(addresses);
            const marketDataByAddressMap = new Map();
            try {
                const params = {
                    ids: Array.from(idByAddressMap.values()).join(","),
                    vs_currency: "usd",
                    include_market_cap: true,
                    include_24hr_vol: true,
                    include_24hr_change: true,
                };
                const res = yield this._apisauce.get("/coins/markets", params);
                const marketDataByIdMap = new Map();
                res.data.forEach((marketData) => {
                    marketDataByIdMap.set(marketData.id, marketData);
                });
                addresses.forEach((address) => {
                    var _a;
                    const id = (_a = idByAddressMap.get(address)) !== null && _a !== void 0 ? _a : "";
                    const marketData = marketDataByIdMap.get(id);
                    marketDataByAddressMap.set(address, marketData);
                });
            }
            catch (error) {
                console.log("🚀 ~ CoinGeckoService ~ error:", error);
            }
            finally {
                return marketDataByAddressMap;
            }
        });
    }
}
exports.CoinGeckoService = CoinGeckoService;
