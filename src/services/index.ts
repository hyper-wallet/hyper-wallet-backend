import { CoinGeckoService } from "./CoinGeckoService";
import { IWalletAssetService } from "./IWalletAssetService";
import { ITokenPriceService } from "./ITokenPriceService";
import { ShyftService } from "./ShyftService";
import { Network } from "./Network";
import { GasFeeSponsor } from "./GasFeeSponsor";
import { configDotenv } from "dotenv";

configDotenv();

const devnetAddressToCoinGeckoId = {
  "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a": "tether",
  "7BuHpQUcAoBPv77UuTcy1PqigWeeGFtnLMvfRZmoxRMA": "usd-coin",
  "9dB35ynAwActVvEPNQBSaiKqiT3KdyG7dMJWyj5RHoou": "stepn",
  "3ZatmBQoWaP2b87hAAZFmVZpWjhqsanLXb7qnZFcYf49": "jupiter-exchange-solana",
  GtWrEZvmTbLonQWXfnGyc36c6r9qwtE3yYCPPFzsfgFa: "coin98",
  So11111111111111111111111111111111111111111: "solana",
};

let coinGeckoService: CoinGeckoService;
let shyftService: ShyftService;

export function getTokenPriceService(): ITokenPriceService {
  if (!coinGeckoService) {
    coinGeckoService = new CoinGeckoService(devnetAddressToCoinGeckoId);
  }
  return coinGeckoService;
}

export function getWalletAssetService(): IWalletAssetService {
  if (!shyftService) {
    shyftService = new ShyftService();
  }
  return shyftService;
}

export const network = new Network();

export const gasFeeSponsor = new GasFeeSponsor(
  process.env.GAS_FEE_SPONSOR_PRIVATE_KEY ?? "",
  network
);
