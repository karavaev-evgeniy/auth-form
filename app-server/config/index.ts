import "dotenv/config";
import process from "node:process";

export const PORT = process.env.SERVER_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;
