import { HTTP_STATUS } from "@server/constants/httpStatus";
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
		return next(createAppError("Not authenticated", HTTP_STATUS.UNAUTHORIZED));
	}

	try {
		const result = await authService.verifyToken(token);

		if (!result.success || !result.user) {
			return next(createAppError("Invalid token", HTTP_STATUS.UNAUTHORIZED));
		}

		req.user = result.user;
		next();
	} catch (error) {
		next(error);
	}
};
