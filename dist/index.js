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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const hyperWalletRouter_1 = __importDefault(require("./routes/hyperWalletRouter"));
const walletRouter_1 = __importDefault(require("./routes/walletRouter"));
const solanaWalletRouter_1 = __importDefault(require("./routes/solanaWalletRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Set up mongoose connection
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
connectDb().catch((err) => console.log(err));
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
    });
}
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/wallet", walletRouter_1.default);
app.use("/hyper-wallet", hyperWalletRouter_1.default);
app.use("/solana-wallet", solanaWalletRouter_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
