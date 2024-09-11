require("dotenv").config();

module.exports = {
	apps: [
		{
			name: "auth-form-client",
			script: "bun",
			args: "run preview",
		},
		{
			name: "auth-form-server",
			script: "./node_modules/.bin/tsx",
			args: "app-server/index.ts",
		},
	],
};
