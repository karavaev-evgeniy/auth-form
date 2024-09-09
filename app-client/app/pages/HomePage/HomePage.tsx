import { StoreContext } from "@app/providers/StoreProvider";
import { useNavigation } from "@shared/hooks/useNavigation";
import UButton from "@shared/ui/UButton/UButton";
import { trpc } from "@shared/utils/trpc";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";

const HomePage = observer(() => {
	const userQuery = trpc.hello.useQuery({});

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
			<p>{userQuery.data}</p>
			<UButton onClick={handleLogout}>Выйти</UButton>
		</div>
	);
});

export default HomePage;
