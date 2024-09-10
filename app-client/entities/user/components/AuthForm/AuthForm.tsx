import { StoreContext } from "@client/app/providers/StoreProvider";
import { useNavigation } from "@client/shared/hooks/useNavigation";
import UButton from "@client/shared/ui/UButton/UButton.tsx";
import UInput from "@client/shared/ui/UInput/UInput.tsx";
import UInputPassword from "@client/shared/ui/UInputPassword/UInputPassword.tsx";
import ULabel from "@client/shared/ui/ULabel/ULabel.tsx";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { z } from "zod";
import "./AuthForm.scss";

const schema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

const AuthForm = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigation = useNavigation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errors, setErrors] = useState({
		email: "",
		password: "",
		general: "",
	});

	const validateForm = () => {
		try {
			schema.parse({ email, password });
			setErrors({ email: "", password: "", general: "" });
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors = { email: "", password: "", general: "" };
				for (const err of error.errors) {
					if (err.path[0] === "email") newErrors.email = err.message;
					if (err.path[0] === "password") newErrors.password = err.message;
				}
				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			const success = await authStore.login(email, password);
			if (success) {
				navigation.goToHome();
			} else {
				setErrors({ ...errors, general: "Invalid email or password" });
			}
		}
	};

	return (
		<>
			<form className="auth-form" onSubmit={handleSubmit}>
				<div className="auth-form__fields">
					<div className="auth-form__row">
						<ULabel className="auth-form__label" htmlFor="email">
							Email
						</ULabel>

						<UInput
							id="email"
							name="email"
							type="email"
							placeholder="@"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						{errors.email && (
							<span className="auth-form__error">{errors.email}</span>
						)}
					</div>

					<div className="auth-form__row">
						<ULabel className="auth-form__label" htmlFor="password">
							Password
						</ULabel>

						<UInputPassword
							id="password"
							name="password"
							placeholder="*"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						{errors.password && (
							<span className="auth-form__error">{errors.password}</span>
						)}
					</div>
				</div>

				{errors.general && (
					<div className="auth-form__error">{errors.general}</div>
				)}

				<div className="auth-form__controls">
					<UButton className="auth-form__button" type="submit">
						Login
					</UButton>
				</div>
			</form>
		</>
	);
});

export default AuthForm;
