import AuthForm from "@user/components/AuthForm/AuthForm.tsx";
import "./LoginPage.scss";

function LoginPage() {
	return (
		<main className="login-page">
			<div className="login-page__grid">
				<h1 className="login-page__title">Please log&nbsp;in...</h1>
				<AuthForm />
			</div>
		</main>
	);
}

export default LoginPage;
