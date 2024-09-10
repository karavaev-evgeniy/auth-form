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

export const authenticateToken = (
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

	const result = authService.verifyToken(token);

	if (!result.success || !result.user) {
		return res.status(401).json({ success: false, message: "Invalid token" });
	}

	req.user = result.user;

	next();
};
