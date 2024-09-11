import type { IUser } from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import * as authService from "../services/authService";
import * as cookieService from "../services/cookieService";
import { createAppError } from "./errorMiddleware";

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

		if (!result.success || !result.data) {
			return next(createAppError("Invalid token", HTTP_STATUS.UNAUTHORIZED));
		}

		req.user = result.data;
		next();
	} catch (error) {
		next(error);
	}
};
