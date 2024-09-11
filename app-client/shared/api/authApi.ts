import type { AuthResponse, UserCheckResponse } from "@shared/types/api";
import type {
	ILoginCredentials,
	IRegistrationCredentials,
} from "@shared/types/user";
import type { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export const authApi = {
	login: (
		credentials: ILoginCredentials,
	): Promise<AxiosResponse<AuthResponse>> =>
		apiClient.post<AuthResponse>("/login", credentials),

	register: (
		credentials: IRegistrationCredentials,
	): Promise<AxiosResponse<AuthResponse>> =>
		apiClient.post<AuthResponse>("/register", credentials),

	logout: (): Promise<AxiosResponse<void>> => apiClient.post<void>("/logout"),

	checkAuth: (): Promise<AxiosResponse<UserCheckResponse>> =>
		apiClient.get<UserCheckResponse>("/user"),
};
