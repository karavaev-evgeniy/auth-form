import { StoreContext } from "@client/app/providers/StoreProvider";
import AuthForm from "@client/entities/user/components/AuthForm/AuthForm";
import { useNavigation } from "@client/shared/hooks/useNavigation";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import "./LoginPage.scss";

const LoginPage = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigation = useNavigation();

	useEffect(() => {
		if (authStore.isAuthenticated) {
			navigation.goToHome();
		}
	}, [authStore.isAuthenticated, navigation]);

	if (authStore.isAuthenticated) {
		return null;
	}

	return (
		<main className="login-page">
			<div className="login-page__grid">
				<h1 className="login-page__title">Please log&nbsp;in...</h1>
				<AuthForm />
			</div>
		</main>
	);
});

export default LoginPage;
