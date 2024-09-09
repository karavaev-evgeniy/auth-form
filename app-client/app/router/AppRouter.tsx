import HomePage from "@client/app/pages/HomePage/HomePage";
import LoginPage from "@client/app/pages/LoginPage/LoginPage";
import ProtectedRoute from "@client/app/router/ProtectedRoute";
import { ROUTES } from "@client/app/types/router";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path={ROUTES.LOGIN} element={<LoginPage />} />
				<Route
					path={ROUTES.HOME}
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
};

export default AppRouter;
