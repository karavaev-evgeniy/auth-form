import type {
	ILoginCredentials,
	IRegistrationCredentials,
} from "@shared/types/user";
import type { Request, Response } from "express";
import * as authService from "../services/authService";

export const login = (req: Request, res: Response) => {
	const { email, password } = req.body as ILoginCredentials;
	const result = authService.authenticateUser(email, password);

	if (result.success) {
		res.cookie("token", result.token, { httpOnly: true, sameSite: "strict" });
		res.json({ success: true, user: result.user });
	} else {
		res.status(401).json({ success: false, message: result.message });
	}
};

export const register = (req: Request, res: Response) => {
	const { email, password } = req.body as IRegistrationCredentials;
	const result = authService.registerUser(email, password);

	if (result.success) {
		res.cookie("token", result.token, { httpOnly: true, sameSite: "strict" });
		res.json({ success: true, user: result.user });
	} else {
		res.status(400).json({ success: false, message: result.message });
	}
};

export const getUser = (req: Request, res: Response) => {
	const token = req.cookies.token;
	const result = authService.getUserFromToken(token);

	if (result.success) {
		res.json({ success: true, user: result.user });
	} else {
		if (result.status != null) {
			res
				.status(result.status)
				.json({ success: false, message: result.message });
		}
	}
};

export const logout = (req: Request, res: Response) => {
	res.clearCookie("token");
	res.json({ success: true });
};
