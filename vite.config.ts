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
			"@client": path.resolve(__dirname, "./app-client"),
			"@shared": path.resolve(__dirname, "./app-shared"),
		},
	},
	build: {
		outDir: "dist",
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"),
			},
		},
	},
});
