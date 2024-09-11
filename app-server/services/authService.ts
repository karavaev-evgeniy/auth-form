import { createAppError } from "@server/middleware/errorMiddleware";
import type { AuthResult, IServerUser, IUser } from "@shared/types/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { users } from "../models/User";

const findUser = (email: string): IServerUser | undefined => {
	return users.find((u) => u.email === email);
};

const createToken = (user: IUser): string => {
	return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "1h",
	});
};

const verifyAndDecodeToken = (token: string): { id: number; email: string } => {
	try {
		return jwt.verify(token, JWT_SECRET) as { id: number; email: string };
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			throw createAppError("Invalid token", 401);
		}

		throw error;
	}
};

const getUserById = (id: number): IServerUser => {
	const user = users.find((u) => u.id === id);

	if (!user) {
		throw createAppError("User not found", 404);
	}
	return user;
};

const createAuthResult = (user: IUser, token?: string): AuthResult => ({
	success: true,
	user: { id: user.id, email: user.email },
	token,
});

export const authenticateUser = async (
	email: string,
	password: string,
): Promise<AuthResult> => {
	const user = findUser(email);

	if (!user) {
		throw createAppError("User not found", 400);
	}

	if (user.password !== password) {
		throw createAppError("Invalid password", 400);
	}

	const token = createToken(user);

	return createAuthResult(user, token);
};

export const registerUser = async (
	email: string,
	password: string,
): Promise<AuthResult> => {
	if (findUser(email)) {
		throw createAppError("User already exists", 400);
	}
	const newUser: IServerUser = {
		id: users.length + 1,
		email,
		password,
	};

	users.push(newUser);

	const token = createToken(newUser);

	return createAuthResult(newUser, token);
};

export const getUserFromToken = async (token: string): Promise<AuthResult> => {
	if (!token) {
		throw createAppError("Not authenticated", 401);
	}

	const decoded = verifyAndDecodeToken(token);
	const user = getUserById(decoded.id);

	return createAuthResult(user);
};

export const verifyToken = async (token: string): Promise<AuthResult> => {
	const decoded = verifyAndDecodeToken(token);
	const user = getUserById(decoded.id);

	return createAuthResult(user);
};
