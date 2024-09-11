import App from "@client/app/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@client/shared/styles/default.scss";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
} else {
	console.error("Root element not found");
}
