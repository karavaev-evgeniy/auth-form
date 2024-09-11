import { clearTokenCookie, setTokenCookie } from "@server/utils/cookie";
import type {
	AuthResult,
	ILoginCredentials,
	IRegistrationCredentials,
} from "@shared/types/user";
import type { Request, Response } from "express";
import * as authService from "../services/authService";

const handleAuthentication = (result: AuthResult, res: Response) => {
	if (result.success && result.token) {
		setTokenCookie(res, result.token);
		res.json({ success: true, user: result.user });
	} else {
		res.status(result.status || 400).json({
			success: false,
			message: result.message || "Authentication failed",
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body as ILoginCredentials;
		const result = await authService.authenticateUser(email, password);
		handleAuthentication(result, res);
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body as IRegistrationCredentials;
		const result = await authService.registerUser(email, password);
		handleAuthentication(result, res);
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.token;
		const result = await authService.getUserFromToken(token);

		if (result.success) {
			res.json({ success: true, user: result.user });
		} else {
			res
				.status(result.status || 400)
				.json({ success: false, message: result.message });
		}
	} catch (error) {
		console.error("Get user error:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const logout = (req: Request, res: Response) => {
	try {
		clearTokenCookie(res);
		res.json({ success: true });
	} catch (error) {
		console.error("Logout error:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
