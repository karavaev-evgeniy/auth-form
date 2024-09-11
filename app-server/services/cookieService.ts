import type { Request, Response } from "express";

/**
 * Устанавливает куки с токеном аутентификации.
 * @param {Response} res - Объект ответа Express.
 * @param {string} token - JWT токен.
 */
export const setAuthCookie = (res: Response, token: string) => {
	res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
};

/**
 * Удаляет куки с токеном аутентификации.
 * @param {Response} res - Объект ответа Express.
 */
export const clearAuthCookie = (res: Response) => {
	res.clearCookie("token");
};

/**
 * Получает токен аутентификации из куки.
 * @param {Request} req - Объект запроса Express.
 * @returns {string | undefined} Токен аутентификации или undefined.
 */
export const getAuthCookie = (req: Request): string | undefined => {
	return req.cookies.token;
};
