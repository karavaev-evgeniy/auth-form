import { authApi } from "@client/shared/api";
import type {
	ApiErrorResponse,
	AuthResponse,
	UserCheckResponse,
} from "@shared/types/api";
import type {
	ILoginCredentials,
	ILoginErrors,
	IRegistrationCredentials,
} from "@shared/types/user";
import { loginSchema, registrationSchema } from "@shared/types/user";
import axios from "axios";
import { z } from "zod";

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

	async login(credentials: ILoginCredentials): Promise<AuthResponse> {
		try {
			const { data } = await authApi.login(credentials);
			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data as ApiErrorResponse;
			}
			return { success: false, message: "An error occurred during login" };
		}
	},

	async register(credentials: IRegistrationCredentials): Promise<AuthResponse> {
		try {
			const { data } = await authApi.register(credentials);
			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data as ApiErrorResponse;
			}
			return {
				success: false,
				message: "An error occurred during registration",
			};
		}
	},

	async logout(): Promise<{ success: boolean; message?: string }> {
		try {
			await authApi.logout();
			return { success: true };
		} catch (error) {
			console.error("Logout error:", error);
			return { success: false, message: "An error occurred during logout" };
		}
	},

	async checkAuth(): Promise<UserCheckResponse> {
		try {
			const { data } = await authApi.checkAuth();
			return data;
		} catch (error) {
			console.error("Check auth error:", error);
			return {
				success: false,
				message: "An error occurred while checking authentication",
			};
		}
	},
};
