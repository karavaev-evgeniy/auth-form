import { z } from "zod";

export interface IUser {
	id?: number;
	email: string;
}

export interface IServerUser extends IUser {
	id: number;
	password: string;
}

export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IRegistrationCredentials extends ILoginCredentials {
	confirmPassword: string;
}

export interface ILoginErrors {
	email?: string;
	password?: string;
	confirmPassword?: string;
	general?: string;
}

export interface AuthResult {
	success: boolean;
	user?: IUser;
	token?: string;
	status?: number;
	message?: string;
}

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const registrationSchema = loginSchema
	.extend({
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
