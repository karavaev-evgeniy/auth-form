import type {
	ApiSuccessResponse,
	AuthResponse,
	UserCheckResponse,
	UserResponse,
} from "@shared/types/api";
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

	login = async (credentials: ILoginCredentials): Promise<AuthResponse> => {
		const result = await UserService.login(credentials);

		runInAction(() => {
			if (this.isAuthSuccessResponse(result)) {
				this.isAuthenticated = true;
				this.user = result.data;
			}
		});

		return result;
	};

	register = async (
		credentials: IRegistrationCredentials,
	): Promise<AuthResponse> => {
		const result = await UserService.register(credentials);

		runInAction(() => {
			if (this.isAuthSuccessResponse(result)) {
				this.isAuthenticated = true;
				this.user = result.data;
			}
		});

		return result;
	};

	logout = async () => {
		const result = await UserService.logout();

		runInAction(() => {
			if (result.success) {
				this.isAuthenticated = false;
				this.user = null;
			}
		});
	};

	checkAuth = async () => {
		const result = await UserService.checkAuth();

		runInAction(() => {
			if (this.isUserCheckSuccessResponse(result)) {
				this.isAuthenticated = true;
				this.user = result.data;
			} else {
				this.isAuthenticated = false;
				this.user = null;
			}
		});
	};

	private isAuthSuccessResponse(
		response: AuthResponse,
	): response is ApiSuccessResponse<UserResponse & { token: string }> {
		return response.success;
	}

	private isUserCheckSuccessResponse(
		response: UserCheckResponse,
	): response is ApiSuccessResponse<UserResponse> {
		return response.success;
	}
}

export const authStore = new AuthStore();
