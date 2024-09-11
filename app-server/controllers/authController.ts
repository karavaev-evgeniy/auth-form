import { HTTP_STATUS } from "@server/constants/httpStatus";
import { createAppError } from "@server/middleware/errorMiddleware";
import type {
	AuthResult,
	ILoginCredentials,
	IRegistrationCredentials,
} from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";
import * as cookieService from "../services/cookieService";

const handleAuthentication = (result: AuthResult, res: Response) => {
	if (result.success && result.token) {
		cookieService.setAuthCookie(res, result.token);
		res.json({ success: true, user: result.user });
	} else {
		throw createAppError(
			result.message || "Authentication failed",
			result.status || HTTP_STATUS.BAD_REQUEST,
		);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body as ILoginCredentials;
		const result = await authService.authenticateUser(email, password);
		handleAuthentication(result, res);
	} catch (error) {
		next(error);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body as IRegistrationCredentials;
		const result = await authService.registerUser(email, password);
		handleAuthentication(result, res);
	} catch (error) {
		next(error);
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = cookieService.getAuthCookie(req);

		if (!token) {
			throw createAppError("Not authenticated", HTTP_STATUS.UNAUTHORIZED);
		}

		const result = await authService.getUserFromToken(token);

		if (result.success) {
			res.json({ success: true, user: result.user });
		} else {
			throw createAppError(
				result.message || "Failed to get user",
				result.status || HTTP_STATUS.BAD_REQUEST,
			);
		}
	} catch (error) {
		next(error);
	}
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
	try {
		cookieService.clearAuthCookie(res);
		res.json({ success: true });
	} catch (error) {
		next(error);
	}
};
