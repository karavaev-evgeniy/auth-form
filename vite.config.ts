import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				exportType: "default",
				ref: true,
				svgo: false,
				titleProp: true,
			},
			include: "**/*.svg",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./app-client"),
			"@app": path.resolve(__dirname, "./app-client/app"),
			"@shared": path.resolve(__dirname, "./app-client/shared"),
			"@user": path.resolve(__dirname, "./app-client/entities/user"),
			"@server": path.resolve(__dirname, "./app-server/server"),
		},
	},
});
