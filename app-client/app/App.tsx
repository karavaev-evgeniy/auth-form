import AuthCheck from "@client/app/components/AuthCheck";
import { StoreProvider } from "@client/app/providers/StoreProvider";
import AppRouter from "@client/app/router/AppRouter";

export function App() {
	return (
		<StoreProvider>
			<AuthCheck>
				<AppRouter />
			</AuthCheck>
		</StoreProvider>
	);
}

export default App;
