import { makeAutoObservable } from "mobx";
import { UserService } from "../services/UserService";
import type { IUser } from "../types/user";

class AuthStore {
	isAuthenticated = false;
	user: IUser | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	login = async (email: string, password: string) => {
		const { success, user } = await UserService.login(email, password);

		if (success && user) {
			this.isAuthenticated = true;
			this.user = user;
			return true;
		}

		return false;
	};

	logout = async () => {
		await UserService.logout();

		this.isAuthenticated = false;
		this.user = null;
	};

	checkAuth = async () => {
		const { success, user } = await UserService.checkAuth();

		if (success && user) {
			this.isAuthenticated = true;
			this.user = user;
		} else {
			this.isAuthenticated = false;
			this.user = null;
		}
	};
}

export const authStore = new AuthStore();
