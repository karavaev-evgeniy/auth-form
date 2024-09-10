import { makeAutoObservable, runInAction } from "mobx";
import { UserService } from "../services/UserService";
import type { ILoginCredentials, IUser } from "../types/user";

class AuthStore {
	isAuthenticated = false;
	user: IUser | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	login = async (credentials: ILoginCredentials) => {
		const { success, user } = await UserService.login(credentials);

		runInAction(() => {
			if (success && user) {
				this.isAuthenticated = true;
				this.user = user;
			}
		});

		return success;
	};

	logout = async () => {
		await UserService.logout();

		runInAction(() => {
			this.isAuthenticated = false;
			this.user = null;
		});
	};

	checkAuth = async () => {
		const { success, user } = await UserService.checkAuth();

		runInAction(() => {
			this.isAuthenticated = success && !!user;
			this.user = user || null;
		});
	};
}

export const authStore = new AuthStore();
