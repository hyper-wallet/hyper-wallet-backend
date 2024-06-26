import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema(
  {
    signature: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    fromAddress: {
      type: String,
      require: true,
    },
    toAddress: {
      type: String,
      require: true,
    },
    token: {
      iconUrl: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      symbol: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
    },
    error: {
      type: String,
      requre: false,
    },
  },
  { timestamps: true },
);

export const WalletTransactionModel = mongoose.model(
  "WalletTransaction",
  walletTransactionSchema,
);
