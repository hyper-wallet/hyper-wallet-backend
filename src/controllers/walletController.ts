import { Request, Response } from "express";
import { getTokenPriceService, getWalletAssetService } from "../services";
import { WalletTransactionModel } from "../models";

export async function getWalletTokens(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "Address is required" });
  }

  const tokenBalanceByAddressMap =
    await getWalletAssetService().getTokenBalances(address.toString());
  const tokenAddresses = Array.from(tokenBalanceByAddressMap.keys());
  const tokenPriceByAddressMap =
    await getTokenPriceService().getPricesByAddresses(tokenAddresses);

  const tokens = tokenAddresses.map((address: string) => {
    const balance = tokenBalanceByAddressMap.get(address);
    const price = tokenPriceByAddressMap.get(address);
    return {
      ...balance,
      price,
    };
  });

  res.json({ tokens });
}

export async function getWalletNfts(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "Address is required" });
  }

  const nfts = await getWalletAssetService().getNfts(address.toString());
  res.json({ nfts });
}

export async function getWalletTransactions(req: Request, res: Response) {
  const { address } = req.query;
  if (!address) {
    return res.json({ error: "Address is required" });
  }

  WalletTransactionModel.find({
    $or: [
      {
        fromAddress: address,
      },
      {
        toAddress: address,
      },
    ],
  })
    .sort("-date")
    .then((transactions) => {
      return res.json({ transactions });
    })
    .catch((e) => res.json({ error: e }));
}

export async function createWalletTransaction(req: Request, res: Response) {
  const { signature, type, fromAddress, toAddress, token, amount, value } =
    req.body;

  const newWalletTransaction = new WalletTransactionModel({
    signature,
    type,
    fromAddress,
    toAddress,
    token,
    amount,
    value,
  });

  newWalletTransaction
    .save()
    .then((transaction) => res.json({ transaction }))
    .catch((e) => res.json({ error: e }));
}

//@ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};
