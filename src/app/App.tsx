import { StoreProvider } from "./providers/StoreProvider";
import AppRouter from "./router/AppRouter";

function App() {
	return (
		<StoreProvider>
			<AppRouter />
		</StoreProvider>
	);
}

export default App;
