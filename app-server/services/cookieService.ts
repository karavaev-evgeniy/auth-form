import type { Request, Response } from "express";

export const setAuthCookie = (res: Response, token: string) => {
	res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
};

export const clearAuthCookie = (res: Response) => {
	res.clearCookie("token");
};

export const getAuthCookie = (req: Request): string | undefined => {
	return req.cookies.token;
};
