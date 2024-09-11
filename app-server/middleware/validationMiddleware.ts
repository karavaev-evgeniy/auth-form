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
			res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: error.errors.map((e) => ({
					field: e.path.join("."),
					message: e.message,
				})),
			});
		} else {
			res
				.status(500)
				.json({ success: false, message: "Internal server error" });
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
			res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: error.errors.map((e) => ({
					field: e.path.join("."),
					message: e.message,
				})),
			});
		} else {
			res
				.status(500)
				.json({ success: false, message: "Internal server error" });
		}
	}
};
