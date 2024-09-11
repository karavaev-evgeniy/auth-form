import { HTTP_STATUS } from "@server/constants/httpStatus";
import type { ApiErrorResponse } from "@shared/types/api";
import { loginSchema, registrationSchema } from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

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
