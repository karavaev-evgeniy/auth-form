import { z } from "zod";
import type { ILoginCredentials, ILoginErrors, IUser } from "../types/user";
import { loginSchema } from "../types/user";

const BASE_URL = "http://localhost:4000/api";

export const UserService = {
	validateLoginForm: (
		credentials: ILoginCredentials,
	): { isValid: boolean; errors: ILoginErrors } => {
		try {
			loginSchema.parse(credentials);
			return { isValid: true, errors: {} };
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: ILoginErrors = {};

				for (let i = 0; i < error.errors.length; i++) {
					const err = error.errors[i];

					if (err.path[0] === "email" || err.path[0] === "password") {
						errors[err.path[0]] = err.message;
					}
				}

				return { isValid: false, errors };
			}

			return { isValid: false, errors: { general: "Validation failed" } };
		}
	},

	async login(
		credentials: ILoginCredentials,
	): Promise<{ success: boolean; user?: IUser }> {
		try {
			const response = await fetch(`${BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
				credentials: "include",
			});

			return await response.json();
		} catch (error) {
			console.error("Login error:", error);
			return { success: false };
		}
	},

	async logout(): Promise<void> {
		try {
			await fetch(`${BASE_URL}/logout`, {
				method: "POST",
				credentials: "include",
			});
		} catch (error) {
			console.error("Logout error:", error);
		}
	},

	async checkAuth(): Promise<{ success: boolean; user?: IUser }> {
		try {
			const response = await fetch(`${BASE_URL}/user`, {
				credentials: "include",
			});

			return await response.json();
		} catch (error) {
			console.error("Check auth error:", error);
			return { success: false };
		}
	},
};
