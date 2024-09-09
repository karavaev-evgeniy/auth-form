import { makeAutoObservable } from "mobx";
import type { IUser } from "../types/user";

class AuthStore {
	isAuthenticated = false;
	user: IUser | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	login = (userData: IUser) => {
		this.isAuthenticated = true;
		this.user = userData;
	};

	logout = () => {
		this.isAuthenticated = false;
		this.user = null;
	};
}

export const authStore = new AuthStore();
