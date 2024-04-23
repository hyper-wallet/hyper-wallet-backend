import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import txRouter from "./routes/txRouter";
import hyperWalletRouter from "./routes/hyperWalletRouter";
import walletRouter from "./routes/walletRouter";
import solanaWalletRouter from "./routes/solanaWalletRouter";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/wallet", walletRouter);
app.use("/hyper-wallet", hyperWalletRouter);
app.use("/solana-wallet", solanaWalletRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
