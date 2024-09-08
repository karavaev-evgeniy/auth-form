import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../providers/StoreProvider";

const ProtectedRoute = observer(({ children }) => {
	const { authStore } = useContext(StoreContext);

	if (!authStore.isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
});

export default ProtectedRoute;
