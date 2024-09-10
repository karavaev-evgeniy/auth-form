import { z } from "zod";

export interface IUser {
	email: string;
}

export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface ILoginErrors {
	email?: string;
	password?: string;
	general?: string;
}

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});
