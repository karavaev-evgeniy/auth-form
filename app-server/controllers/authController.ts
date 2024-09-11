import { HTTP_STATUS } from "@server/constants/httpStatus";
import { createAppError } from "@server/middleware/errorMiddleware";
import type {
	ApiResponse,
	AuthResponse,
	UserCheckResponse,
} from "@shared/types/api";
import type {
	ILoginCredentials,
	IRegistrationCredentials,
} from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";
import * as cookieService from "../services/cookieService";

/**
 * Обрабатывает результат аутентификации и отправляет ответ клиенту.
 * @param {AuthResponse} result - Результат аутентификации.
 * @param {Response} res - Объект ответа Express.
 */
const handleAuthentication = (result: AuthResponse, res: Response) => {
	if (result.success && result.data) {
		cookieService.setAuthCookie(res, result.data.token);
		res.json(result);
	} else {
		throw createAppError(
			result.message || "Authentication failed",
			result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
		);
	}
};

/**
 * Обрабатывает запрос на вход пользователя.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 * @param {NextFunction} next - Функция перехода к следующему middleware.
 */
export const login = async (
	req: Request,
	res: Response<AuthResponse>,
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

/**
 * Обрабатывает запрос на регистрацию нового пользователя.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 * @param {NextFunction} next - Функция перехода к следующему middleware.
 */
export const register = async (
	req: Request,
	res: Response<AuthResponse>,
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

/**
 * Получает информацию о текущем пользователе.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 * @param {NextFunction} next - Функция перехода к следующему middleware.
 */
export const getUser = async (
	req: Request,
	res: Response<UserCheckResponse>,
	next: NextFunction,
) => {
	try {
		const token = cookieService.getAuthCookie(req);

		if (!token) {
			throw createAppError("Not authenticated", HTTP_STATUS.UNAUTHORIZED);
		}

		const result = await authService.getUserFromToken(token);

		if (result.success && result.data) {
			res.json(result);
		} else {
			throw createAppError(
				result.message || "Failed to get user",
				HTTP_STATUS.BAD_REQUEST,
			);
		}
	} catch (error) {
		next(error);
	}
};

/**
 * Обрабатывает запрос на выход пользователя.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 * @param {NextFunction} next - Функция перехода к следующему middleware.
 */
export const logout = (
	req: Request,
	res: Response<ApiResponse<void>>,
	next: NextFunction,
) => {
	try {
		cookieService.clearAuthCookie(res);
		res.json({ success: true, data: undefined });
	} catch (error) {
		next(error);
	}
};
