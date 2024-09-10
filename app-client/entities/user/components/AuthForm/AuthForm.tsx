import { StoreContext } from "@client/app/providers/StoreProvider";
import { useNavigation } from "@client/shared/hooks/useNavigation";
import UButton from "@client/shared/ui/UButton/UButton.tsx";
import UInput from "@client/shared/ui/UInput/UInput.tsx";
import UInputPassword from "@client/shared/ui/UInputPassword/UInputPassword.tsx";
import ULabel from "@client/shared/ui/ULabel/ULabel.tsx";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import "./AuthForm.scss";
import { UserService } from "@client/entities/user/services/UserService";
import type {
	ILoginErrors,
	IRegistrationCredentials,
} from "@client/entities/user/types/user";

const AuthForm = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigation = useNavigation();

	const [isRegistration, setIsRegistration] = useState(false);
	const [credentials, setCredentials] = useState<IRegistrationCredentials>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState<ILoginErrors>({
		email: "",
		password: "",
		confirmPassword: "",
		general: "",
	});

	const validateForm = () => {
		const { isValid, errors: validationErrors } = isRegistration
			? UserService.validateRegistrationForm(credentials)
			: UserService.validateLoginForm(credentials);

		setErrors((prevErrors) => ({
			...prevErrors,
			...validationErrors,
		}));

		return isValid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			if (isRegistration) {
				const success = await authStore.register(credentials);

				if (success) {
					navigation.goToHome();
				} else {
					setErrors({ ...errors, general: "Registration failed" });
				}
			} else {
				const result = await authStore.login(credentials);

				if (result.success) {
					navigation.goToHome();
				} else {
					if (result.message === "User not found") {
						setErrors({
							...errors,
							general: "User not found. Registration required.",
						});

						setIsRegistration(true);
					} else {
						setErrors({ ...errors, general: result.message || "Login failed" });
					}
				}
			}
		}
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<div className="auth-form__fields">
				{/* Email field */}
				<div className="auth-form__row">
					<ULabel className="auth-form__label" htmlFor="email">
						Email
					</ULabel>
					<UInput
						id="email"
						name="email"
						type="email"
						placeholder="@"
						value={credentials.email}
						onChange={(e) =>
							setCredentials({ ...credentials, email: e.target.value })
						}
					/>
					{errors.email && (
						<span className="auth-form__error">{errors.email}</span>
					)}
				</div>

				{/* Password field */}
				<div className="auth-form__row">
					<ULabel className="auth-form__label" htmlFor="password">
						Password
					</ULabel>
					<UInputPassword
						id="password"
						name="password"
						placeholder="*"
						value={credentials.password}
						onChange={(e) =>
							setCredentials({ ...credentials, password: e.target.value })
						}
					/>
					{errors.password && (
						<span className="auth-form__error">{errors.password}</span>
					)}
				</div>

				{/* Confirm Password field (only for registration) */}
				{isRegistration && (
					<div className="auth-form__row">
						<ULabel className="auth-form__label" htmlFor="confirmPassword">
							Confirm Password
						</ULabel>
						<UInputPassword
							id="confirmPassword"
							name="confirmPassword"
							placeholder="*"
							value={credentials.confirmPassword}
							onChange={(e) =>
								setCredentials({
									...credentials,
									confirmPassword: e.target.value,
								})
							}
						/>
						{errors.confirmPassword && (
							<span className="auth-form__error">{errors.confirmPassword}</span>
						)}
					</div>
				)}
			</div>

			{errors.general && (
				<div className="auth-form__error">{errors.general}</div>
			)}

			<div className="auth-form__controls">
				<UButton className="auth-form__button" type="submit">
					{isRegistration ? "Register" : "Login"}
				</UButton>
			</div>
		</form>
	);
});

export default AuthForm;
