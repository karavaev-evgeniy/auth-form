import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

const t = initTRPC.create();

const helloProcedure = t.procedure.query(() => {
	return "Hello world";
});

const appRouter = t.router<{}>({
	hello: helloProcedure,
});

const server = createHTTPServer({
	middleware: cors(),
	router: appRouter,
	createContext() {
		return {};
	},
});

server.listen(3000);

console.log("Server running on http://localhost:3000");

export type AppRouter = typeof appRouter;
