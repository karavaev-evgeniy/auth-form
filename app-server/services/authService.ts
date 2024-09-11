import { HTTP_STATUS } from "@server/constants/httpStatus";
import { createAppError } from "@server/middleware/errorMiddleware";
import type { AuthResponse, UserCheckResponse } from "@shared/types/api";
import type { IServerUser, IUser } from "@shared/types/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { users } from "../models/User";

/**
 * Находит пользователя по email.
 * @param {string} email - Email пользователя.
 * @returns {IServerUser | undefined} Найденный пользователь или undefined.
 */
const findUser = (email: string): IServerUser | undefined => {
	return users.find((u) => u.email === email);
};

/**
 * Создает JWT токен для пользователя.
 * @param {IUser} user - Объект пользователя.
 * @returns {string} JWT токен.
 */
const createToken = (user: IUser): string => {
	return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "1h",
	});
};

/**
 * Проверяет и декодирует JWT токен.
 * @param {string} token - JWT токен.
 * @returns {{ id: number; email: string }} Декодированные данные пользователя.
 */
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

/**
 * Находит пользователя по ID.
 * @param {number} id - ID пользователя.
 * @returns {IServerUser} Найденный пользователь.
 * @throws {AppError} Если пользователь не найден.
 */
const getUserById = (id: number): IServerUser => {
	const user = users.find((u) => u.id === id);

	if (!user) {
		throw createAppError("User not found", HTTP_STATUS.NOT_FOUND);
	}
	return user;
};

/**
 * Создает объект результата аутентификации.
 * @param {IUser} user - Объект пользователя.
 * @param {string} token - JWT токен.
 * @returns {AuthResponse} Объект результата аутентификации.
 */
const createAuthResult = (user: IUser, token: string): AuthResponse => ({
	success: true,
	data: { id: user.id, email: user.email, token },
});

/**
 * Аутентифицирует пользователя по email и паролю.
 * @param {string} email - Email пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<AuthResponse>} Результат аутентификации.
 */
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

/**
 * Регистрирует нового пользователя.
 * @param {string} email - Email пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Promise<AuthResponse>} Результат регистрации.
 */
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

/**
 * Получает информацию о пользователе из токена.
 * @param {string} token - JWT токен.
 * @returns {Promise<UserCheckResponse>} Информация о пользователе.
 */
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

/**
 * Проверяет валидность токена и возвращает информацию о пользователе.
 * @param {string} token - JWT токен.
 * @returns {Promise<UserCheckResponse>} Информация о пользователе.
 */
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
