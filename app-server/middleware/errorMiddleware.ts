import { HTTP_STATUS, type HttpStatus } from "@server/constants/httpStatus";
import type { ApiResponse } from "@shared/types/api";
import type { NextFunction, Request, Response } from "express";

export interface AppError {
	message: string;
	statusCode: HttpStatus;
	isOperational: boolean;
}

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

export const errorHandler = (
	err: AppError | Error,
	req: Request,
	res: Response<ApiResponse>,
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
