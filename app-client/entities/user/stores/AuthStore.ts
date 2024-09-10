import type {
	ILoginCredentials,
	IRegistrationCredentials,
	IUser,
} from "@shared/types/user";
import { makeAutoObservable, runInAction } from "mobx";
import { UserService } from "../services/UserService";

class AuthStore {
	isAuthenticated = false;
	user: IUser | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	login = async (credentials: ILoginCredentials) => {
		const result = await UserService.login(credentials);

		runInAction(() => {
			if (result.success && result.user) {
				this.isAuthenticated = true;
				this.user = result.user;
			}
		});

		return result;
	};

	register = async (credentials: IRegistrationCredentials) => {
		const { success, user } = await UserService.register(credentials);

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
