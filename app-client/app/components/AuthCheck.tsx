import { StoreContext } from "@client/app/providers/StoreProvider";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import "./AuthCheck.scss";

/**
 * Компонент для проверки аутентификации пользователя.
 * Отображает экран загрузки, пока проверяется статус аутентификации.
 * @param {React.ReactNode} children - Дочерние компоненты, которые будут отображены после проверки аутентификации.
 */
const AuthCheck = observer(({ children }) => {
	const { authStore } = useContext(StoreContext);
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				await authStore.checkAuth();
			} catch (error) {
				console.error("Error checking auth:", error);
			} finally {
				setTimeout(() => {
					setIsChecking(false);
				}, 1000);
			}
		})();
	}, [authStore]);

	if (isChecking) {
		return (
			<main className="auth-check">
				<h1 className="auth-check__text">Checking authorization...</h1>
			</main>
		);
	}

	return children;
});

export default AuthCheck;
