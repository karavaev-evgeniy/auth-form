export const ROUTES = {
	HOME: "/",
	LOGIN: "/login",
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = (typeof ROUTES)[RouteKeys];
