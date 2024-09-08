import { StoreProvider } from "@app/providers/StoreProvider";
import AppRouter from "@app/router/AppRouter";

function App() {
	return (
		<StoreProvider>
			<AppRouter />
		</StoreProvider>
	);
}

export default App;
