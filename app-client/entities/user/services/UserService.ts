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
	/**
	 * Валидирует форму входа.
	 * @param {ILoginCredentials} credentials - Данные для входа.
	 * @returns {{ isValid: boolean; errors: ILoginErrors }} Результат валидации.
	 */
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

	/**
	 * Валидирует форму регистрации.
	 * @param {IRegistrationCredentials} credentials - Данные для регистрации.
	 * @returns {{ isValid: boolean; errors: ILoginErrors }} Результат валидации.
	 */
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

	/**
	 * Выполняет запрос на вход пользователя.
	 * @param {ILoginCredentials} credentials - Данные для входа.
	 * @returns {Promise<AuthResponse>} Результат входа.
	 */
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

	/**
	 * Выполняет запрос на регистрацию пользователя.
	 * @param {IRegistrationCredentials} credentials - Данные для регистрации.
	 * @returns {Promise<AuthResponse>} Результат регистрации.
	 */
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

	/**
	 * Выполняет запрос на выход пользователя.
	 * @returns {Promise<{ success: boolean; message?: string }>} Результат выхода.
	 */
	async logout(): Promise<{ success: boolean; message?: string }> {
		try {
			await authApi.logout();
			return { success: true };
		} catch (error) {
			console.error("Logout error:", error);
			return { success: false, message: "An error occurred during logout" };
		}
	},

	/**
	 * Проверяет статус аутентификации пользователя.
	 * @returns {Promise<UserCheckResponse>} Результат проверки аутентификации.
	 */
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
