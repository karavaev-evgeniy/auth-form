import { StoreContext } from "@client/app/providers/StoreProvider";
import { ROUTES } from "@client/app/types/router";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = observer(({ children }) => {
	const { authStore } = useContext(StoreContext);

	if (!authStore.isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return children;
});

export default ProtectedRoute;
