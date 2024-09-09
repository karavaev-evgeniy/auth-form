import app from "./app";
import { PORT } from "./config";

const startServer = async () => {
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
	});
};

startServer().catch((error) => {
	console.log(`Error running server on port: ${PORT}`);
	console.error(error);
});
