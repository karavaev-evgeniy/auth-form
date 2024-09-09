import { StoreContext } from "@client/app/providers/StoreProvider";
import { useNavigation } from "@client/shared/hooks/useNavigation";
import UButton from "@client/shared/ui/UButton/UButton";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";

const HomePage = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigation = useNavigation();

	useEffect(() => {
		if (!authStore.isAuthenticated) {
			navigation.goToLogin();
		}
	}, [authStore.isAuthenticated, navigation]);

	const handleLogout = () => {
		authStore.logout();
		navigation.goToLogin();
	};

	if (!authStore.isAuthenticated) {
		return null;
	}

	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome, {authStore.user?.email}!</p>
			<UButton onClick={handleLogout}>Выйти</UButton>
		</div>
	);
});

export default HomePage;
