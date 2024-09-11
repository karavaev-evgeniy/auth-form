import { HTTP_STATUS } from "@server/constants/httpStatus";
import type { ApiErrorResponse } from "@shared/types/api";
import { loginSchema, registrationSchema } from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

/**
 * Обрабатывает ошибки валидации Zod.
 * @param {ZodError} error - Объект ошибки Zod.
 * @returns {ApiErrorResponse} Объект с информацией об ошибках валидации.
 */
const handleValidationError = (error: ZodError): ApiErrorResponse => {
	return {
		success: false,
		message: "Validation failed",
		errors: error.errors.map((err) => ({
			field: err.path.join("."),
			message: err.message,
		})),
	};
};

/**
 * Middleware для валидации данных входа.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 * @param {NextFunction} next - Функция перехода к следующему middleware.
 */
export const validateLogin = (
	req: Request,
	res: Response<ApiErrorResponse>,
	next: NextFunction,
) => {
	try {
		loginSchema.parse(req.body);
		next();
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(HTTP_STATUS.BAD_REQUEST).json(handleValidationError(error));
		} else {
			next(error);
		}
	}
};

/**
 * Middleware для валидации данных регистрации.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 * @param {NextFunction} next - Функция перехода к следующему middleware.
 */
export const validateRegistration = (
	req: Request,
	res: Response<ApiErrorResponse>,
	next: NextFunction,
) => {
	try {
		registrationSchema.parse(req.body);
		next();
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(HTTP_STATUS.BAD_REQUEST).json(handleValidationError(error));
		} else {
			next(error);
		}
	}
};
