import { HTTP_STATUS } from "@server/constants/httpStatus";
import { createAppError } from "@server/middleware/errorMiddleware";
import type { AuthResponse, UserCheckResponse } from "@shared/types/api";
import type { IServerUser, IUser } from "@shared/types/user";
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
			throw createAppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
		}
		throw error;
	}
};

const getUserById = (id: number): IServerUser => {
	const user = users.find((u) => u.id === id);

	if (!user) {
		throw createAppError("User not found", HTTP_STATUS.NOT_FOUND);
	}
	return user;
};

const createAuthResult = (user: IUser, token: string): AuthResponse => ({
	success: true,
	data: { id: user.id, email: user.email, token },
});

export const authenticateUser = async (
	email: string,
	password: string,
): Promise<AuthResponse> => {
	const user = findUser(email);

	if (!user) {
		throw createAppError("User not found", HTTP_STATUS.BAD_REQUEST);
	}

	if (user.password !== password) {
		throw createAppError("Invalid password", HTTP_STATUS.BAD_REQUEST);
	}

	const token = createToken(user);

	return createAuthResult(user, token);
};

export const registerUser = async (
	email: string,
	password: string,
): Promise<AuthResponse> => {
	if (findUser(email)) {
		throw createAppError("User already exists", HTTP_STATUS.BAD_REQUEST);
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

export const getUserFromToken = async (
	token: string,
): Promise<UserCheckResponse> => {
	if (!token) {
		throw createAppError("Not authenticated", HTTP_STATUS.UNAUTHORIZED);
	}

	const decoded = verifyAndDecodeToken(token);
	const user = getUserById(decoded.id);

	return {
		success: true,
		data: { id: user.id, email: user.email },
	};
};

export const verifyToken = async (
	token: string,
): Promise<UserCheckResponse> => {
	const decoded = verifyAndDecodeToken(token);
	const user = getUserById(decoded.id);

	return {
		success: true,
		data: { id: user.id, email: user.email },
	};
};
