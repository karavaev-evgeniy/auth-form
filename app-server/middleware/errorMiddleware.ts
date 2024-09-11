import type { NextFunction, Request, Response } from "express";
import type { ApiResponse } from "../../app-shared/types/api";
import { HTTP_STATUS, type HttpStatus } from "../constants/httpStatus";

export interface AppError {
	message: string;
	statusCode: HttpStatus;
	isOperational: boolean;
}

/**
 * Создает объект ошибки приложения.
 * @param {string} message - Сообщение об ошибке.
 * @param {HttpStatus} statusCode - HTTP статус код ошибки.
 * @returns {AppError} Объект ошибки приложения.
 */
export function createAppError(
	message: string,
	statusCode: HttpStatus,
): AppError {
	return {
		message,
		statusCode,
		isOperational: true,
	};
}

/**
 * Middleware для обработки ошибок.
 * @param {AppError | Error} err - Объект ошибки.
 * @param {Request} req - Объект запроса Express.
 * @param {Response} res - Объект ответа Express.
 * @param {NextFunction} next - Функция перехода к следующему middleware.
 */
export const errorHandler = (
	err: AppError | Error,
	req: Request,
	res: Response<ApiResponse<void>>, // Изменено здесь
	next: NextFunction,
) => {
	if ("statusCode" in err && "isOperational" in err) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	}

	console.error("Unexpected error:", err);

	res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
		success: false,
		message: "An unexpected error occurred",
	});
};
