import { StoreProvider } from "@client/app/providers/StoreProvider";
import AppRouter from "@client/app/router/AppRouter";

export function App() {
	return (
		<StoreProvider>
			<AppRouter />
		</StoreProvider>
	);
}

export default App;
