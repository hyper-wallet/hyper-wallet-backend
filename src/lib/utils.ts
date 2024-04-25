const devnetAddressToCoinGeckoId = {
  "5oUHhQyq6wgq1HnbVf5Vr3Soxu5FNU1Jv2YeKPLopg7a": "tether",
  "7BuHpQUcAoBPv77UuTcy1PqigWeeGFtnLMvfRZmoxRMA": "usd-coin",
  "9dB35ynAwActVvEPNQBSaiKqiT3KdyG7dMJWyj5RHoou": "stepn",
  "3ZatmBQoWaP2b87hAAZFmVZpWjhqsanLXb7qnZFcYf49": "jupiter-exchange-solana",
  "GtWrEZvmTbLonQWXfnGyc36c6r9qwtE3yYCPPFzsfgFa": "coin98",
};
export function getCoinGeckoId(devnetTokenAddress: string) {
  if (Object.keys(devnetAddressToCoinGeckoId).includes(devnetTokenAddress)) {
    //@ts-ignore
    return devnetAddressToCoinGeckoId[devnetTokenAddress];
  }
  return "abc";
}
