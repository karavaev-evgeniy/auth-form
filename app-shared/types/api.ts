export interface ValidationError {
	field: string;
	message: string;
}

export interface ApiErrorResponse {
	success: false;
	message: string;
	errors?: ValidationError[];
}

export interface ApiSuccessResponse<T> {
	success: true;
	data: T;
	message?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface UserResponse {
	id: number;
	email: string;
}

export type AuthResponse = ApiResponse<UserResponse & { token: string }>;
export type UserCheckResponse = ApiResponse<UserResponse>;
