import type { NextFunction, Request, Response } from "express";

export interface AppError {
	message: string;
	statusCode: number;
	isOperational: boolean;
}

export function createAppError(message: string, statusCode: number): AppError {
	return {
		message,
		statusCode,
		isOperational: true,
	};
}

export const errorHandler = (
	err: AppError | Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if ("statusCode" in err && "isOperational" in err) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	}

	console.error("Unexpected error:", err);

	res.status(500).json({
		success: false,
		message: "An unexpected error occurred",
	});
};
