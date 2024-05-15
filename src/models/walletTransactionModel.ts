import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
  signature: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  subTitle: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
  subValue: {
    type: String,
    require: true,
  },
  iconUrl: {
    type: String,
  },
  walletAddress: {
    type: String,
    require: true,
  },
});

export const WalletTransactionModel = mongoose.model(
  "WalletTransaction",
  walletTransactionSchema
);
