import { createAppError } from "@server/middleware/errorMiddleware";
import type { IUser } from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";
import * as cookieService from "../services/cookieService";

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
	const token = cookieService.getAuthCookie(req);

	if (!token) {
		return next(createAppError("Not authenticated", 401));
	}

	try {
		const result = await authService.verifyToken(token);

		if (!result.success || !result.user) {
			return next(createAppError("Invalid token", 401));
		}

		req.user = result.user;
		next();
	} catch (error) {
		next(error);
	}
};
