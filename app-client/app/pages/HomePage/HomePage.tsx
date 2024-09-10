import { StoreContext } from "@client/app/providers/StoreProvider";
import { useNavigation } from "@client/shared/hooks/useNavigation";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import "./HomePage.scss";

const HomePage = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigation = useNavigation();

	const handleLogout = async () => {
		await authStore.logout();
		navigation.goToLogin();
	};

	if (!authStore.isAuthenticated) {
		return null;
	}

	return (
		<div className="home-page">
			<p>{authStore.user?.email}</p>

			<button
				className="home-page__logout"
				type="button"
				onClick={handleLogout}
			>
				Выйти
			</button>
		</div>
	);
});

export default HomePage;
