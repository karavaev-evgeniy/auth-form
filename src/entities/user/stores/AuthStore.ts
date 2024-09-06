import { makeAutoObservable } from "mobx";

class AuthStore {
	isAuthenticated = false;
	user = null;

	constructor() {
		makeAutoObservable(this);
	}

	login = (userData) => {
		this.isAuthenticated = true;
		this.user = userData;
	};

	logout = () => {
		this.isAuthenticated = false;
		this.user = null;
	};
}

export const authStore = new AuthStore();
