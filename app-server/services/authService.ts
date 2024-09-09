import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { User, users } from "../models/User";

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
	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: "1h",
		});

		return {
			success: true,
			user: { id: user.id, email: user.email },
			token,
		};
	}

	return {
		success: false,
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
