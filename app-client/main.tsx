import App from "@app/App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@shared/styles/default.scss";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
