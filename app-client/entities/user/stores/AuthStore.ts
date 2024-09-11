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
			if (result.success && result.data) {
				this.isAuthenticated = true;
				this.user = result.data;
			}
		});

		return result;
	};

	register = async (credentials: IRegistrationCredentials) => {
		const result = await UserService.register(credentials);

		runInAction(() => {
			if (result.success && result.data) {
				this.isAuthenticated = true;
				this.user = result.data;
			}
		});

		return result.success;
	};

	logout = async () => {
		await UserService.logout();

		runInAction(() => {
			this.isAuthenticated = false;
			this.user = null;
		});
	};

	checkAuth = async () => {
		const result = await UserService.checkAuth();

		runInAction(() => {
			this.isAuthenticated = result.success && !!result.data;
			this.user = result.data || null;
		});
	};
}

export const authStore = new AuthStore();
