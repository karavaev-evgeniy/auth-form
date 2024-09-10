import type {
	ILoginCredentials,
	ILoginErrors,
	IRegistrationCredentials,
	IUser,
} from "@shared/types/user";
import { loginSchema, registrationSchema } from "@shared/types/user";
import { z } from "zod";

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

	validateRegistrationForm: (
		credentials: IRegistrationCredentials,
	): { isValid: boolean; errors: ILoginErrors } => {
		try {
			registrationSchema.parse(credentials);
			return { isValid: true, errors: {} };
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: ILoginErrors = {};

				for (let i = 0; i < error.errors.length; i++) {
					const err = error.errors[i];

					if (
						err.path[0] === "email" ||
						err.path[0] === "password" ||
						err.path[0] === "confirmPassword"
					) {
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
	): Promise<{ success: boolean; user?: IUser; message?: string }> {
		try {
			const response = await fetch(`${BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
				credentials: "include",
			});

			const data = await response.json();

			if (!response.ok) {
				return { success: false, message: data.message };
			}

			return data;
		} catch (error) {
			console.error("Login error:", error);
			return { success: false, message: "An error occurred during login" };
		}
	},

	async register(
		credentials: IRegistrationCredentials,
	): Promise<{ success: boolean; user?: IUser }> {
		try {
			const response = await fetch(`${BASE_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
				credentials: "include",
			});

			return await response.json();
		} catch (error) {
			console.error("Registration error:", error);
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
