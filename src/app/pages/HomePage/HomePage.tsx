import { StoreContext } from "@app/providers/StoreProvider";
import UButton from "@shared/ui/UButton/UButton.tsx";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		authStore.logout();
		navigate("/login");
	};

	if (!authStore.isAuthenticated) {
		navigate("/login");
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
