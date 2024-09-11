import type { IUser } from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}

export const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.token;

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "Not authenticated" });
	}

	try {
		const result = await authService.verifyToken(token);

		if (!result.success || !result.user) {
			return res.status(401).json({ success: false, message: "Invalid token" });
		}

		req.user = result.user;
		next();
	} catch (error) {
		console.error("Token verification error:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
