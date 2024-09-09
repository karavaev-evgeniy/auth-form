import type { IUser } from "../types/user";

const BASE_URL = "http://localhost:4000/api";

export const UserService = {
	async login(
		email: string,
		password: string,
	): Promise<{ success: boolean; user?: IUser }> {
		try {
			const response = await fetch(`${BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
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
