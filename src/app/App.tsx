import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { StoreProvider } from "./providers/StoreProvider";
import { StoreContext } from "./providers/StoreProvider";

const ProtectedRoute = observer(({ children }) => {
	const { authStore } = useContext(StoreContext);

	if (!authStore.isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
});

function App() {
	return (
		<StoreProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</StoreProvider>
	);
}

export default App;
