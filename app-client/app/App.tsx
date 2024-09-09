import { StoreProvider } from "@client/app/providers/StoreProvider";
import { StoreContext } from "@client/app/providers/StoreProvider";
import AppRouter from "@client/app/router/AppRouter";
import { useContext, useEffect } from "react";

export function App() {
	const { authStore } = useContext(StoreContext);

	useEffect(() => {
		authStore.checkAuth();
	}, [authStore]);

	return (
		<StoreProvider>
			<AppRouter />
		</StoreProvider>
	);
}

export default App;
