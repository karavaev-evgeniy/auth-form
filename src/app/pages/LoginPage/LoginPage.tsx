import { StoreContext } from "@app/providers/StoreProvider";
import AuthForm from "@user/components/AuthForm/AuthForm.tsx";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (authStore.isAuthenticated) {
			navigate("/");
		}
	}, [authStore.isAuthenticated, navigate]);

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
