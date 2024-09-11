import { errorHandler } from "@server/middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { CLIENT_URL } from "./config";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: CLIENT_URL,
		credentials: true,
	}),
);

app.use("/api", authRoutes);

app.use(errorHandler);

export default app;
