import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import txRouter from "./routes/txRouter";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/tx", txRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});