import type { Response } from "express";

export const setTokenCookie = (res: Response, token: string) => {
	res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
};

export const clearTokenCookie = (res: Response) => {
	res.clearCookie("token");
};
