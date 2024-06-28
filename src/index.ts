import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import hyperWalletRouter from "./routes/hyperWalletRouter";
import walletRouter from "./routes/walletRouter";
import solanaWalletRouter from "./routes/solanaWalletRouter";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Set up mongoose connection
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

connectDb().catch((err) => console.log(err));
async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URI as string);
}

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use("/wallet", walletRouter);
app.use("/hyper-wallet", hyperWalletRouter);
app.use("/solana-wallet", solanaWalletRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
