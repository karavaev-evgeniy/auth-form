import { StoreContext } from "@client/app/providers/StoreProvider";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

const AuthCheck = observer(({ children }) => {
	const { authStore } = useContext(StoreContext);
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			await authStore.checkAuth();
			setIsChecking(false);
		};
		checkAuth();
	}, [authStore]);

	if (isChecking) {
		return <div>Loading...</div>;
	}

	return children;
});

export default AuthCheck;
