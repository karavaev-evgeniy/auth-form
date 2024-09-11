export interface ApiResponse<T = undefined> {
	success: boolean;
	data?: T;
	message?: string;
}

export interface UserResponse {
	id: number;
	email: string;
}

export interface AuthResponse extends ApiResponse<UserResponse> {
	token?: string;
}
