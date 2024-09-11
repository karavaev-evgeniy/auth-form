import { createAppError } from "@server/middleware/errorMiddleware";
import { loginSchema, registrationSchema } from "@shared/types/user";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const validateLogin = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		loginSchema.parse(req.body);
		next();
	} catch (error) {
		if (error instanceof ZodError) {
			next(createAppError("Validation failed", 400));
		} else {
			next(error);
		}
	}
};

export const validateRegistration = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		registrationSchema.parse(req.body);
		next();
	} catch (error) {
		if (error instanceof ZodError) {
			next(createAppError("Validation failed", 400));
		} else {
			next(error);
		}
	}
};
