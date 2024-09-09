import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { FRONTEND_URL } from "./config";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	}),
);

app.use("/api", authRoutes);

export default app;
