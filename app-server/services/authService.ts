import type { IServerUser } from "@shared/types/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { users } from "../models/User";

interface AuthResult {
	success: boolean;
	user?: {
		id: number;
		email: string;
	};
	token?: string;
	status?: number;
	message?: string;
}

export const authenticateUser = (
	email: string,
	password: string,
): AuthResult => {
	const user = users.find((u) => u.email === email);

	if (!user) {
		return {
			success: false,
			message: "User not found",
		};
	}

	if (user.password !== password) {
		return {
			success: false,
			message: "Invalid password",
		};
	}

	const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "1h",
	});

	return {
		success: true,
		user: { id: user.id, email: user.email },
		token,
	};
};

export const registerUser = (email: string, password: string): AuthResult => {
	const existingUser = users.find((u) => u.email === email);

	if (existingUser) {
		return {
			success: false,
			message: "User already exists",
		};
	}

	const newUser: IServerUser = {
		id: users.length + 1,
		email,
		password,
	};

	users.push(newUser);

	const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
		expiresIn: "1h",
	});

	return {
		success: true,
		user: { id: newUser.id, email: newUser.email },
		token,
	};
};

export const getUserFromToken = (token: string): AuthResult => {
	if (!token) {
		return {
			success: false,
			status: 401,
			message: "Not authenticated",
		};
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as {
			id: number;
			email: string;
		};

		const user = users.find((u) => u.id === decoded.id);

		if (user) {
			return {
				success: true,
				user: { id: user.id, email: user.email },
			};
		}

		return {
			success: false,
			status: 404,
			message: "User not found",
		};
	} catch (error) {
		return {
			success: false,
			status: 401,
			message: "Invalid token",
		};
	}
};

export const verifyToken = (token: string): AuthResult => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as {
			id: number;
			email: string;
		};

		const user = users.find((u) => u.id === decoded.id);

		if (user) {
			return {
				success: true,
				user: { id: user.id, email: user.email },
			};
		}
	} catch (error) {
		// Do nothing
	}

	return {
		success: false,
	};
};
