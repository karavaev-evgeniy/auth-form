import { StoreContext } from "@client/app/providers/StoreProvider";
import { useNavigation } from "@client/shared/hooks/useNavigation";
import UButton from "@client/shared/ui/UButton/UButton.tsx";
import UInput from "@client/shared/ui/UInput/UInput.tsx";
import UInputPassword from "@client/shared/ui/UInputPassword/UInputPassword.tsx";
import ULabel from "@client/shared/ui/ULabel/ULabel.tsx";
import { observer } from "mobx-react-lite";
import { useCallback, useContext, useState } from "react";
import "./AuthForm.scss";
import { UserService } from "@client/entities/user/services/UserService";
import type { ApiErrorResponse, AuthResponse } from "@shared/types/api";
import type {
	ILoginErrors,
	IRegistrationCredentials,
} from "@shared/types/user";

/**
 * Компонент формы аутентификации.
 * Обрабатывает вход и регистрацию пользователя.
 */
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

	const handleInputChange = useCallback(
		(field: keyof IRegistrationCredentials, value: string) => {
			setCredentials((prev) => ({ ...prev, [field]: value }));
			setErrors((prev) => ({ ...prev, [field]: "", general: "" }));
		},
		[],
	);

	/**
	 * Валидирует форму перед отправкой.
	 * @returns {boolean} Результат валидации.
	 */
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

	/**
	 * Обрабатывает отправку формы.
	 * @param {React.FormEvent} event - Событие отправки формы.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			if (isRegistration) {
				const result = await authStore.register(credentials);
				handleAuthResult(result);
			} else {
				const result = await authStore.login(credentials);
				handleAuthResult(result);
			}
		}
	};

	/**
	 * Обрабатывает результат аутентификации.
	 * @param {AuthResponse | ApiErrorResponse} result - Результат запроса аутентификации.
	 */
	const handleAuthResult = (result: AuthResponse | ApiErrorResponse) => {
		if (result.success) {
			navigation.goToHome();
		} else {
			handleApiErrors(result);
		}
	};

	/**
	 * Обрабатывает ошибки API.
	 * @param {ApiErrorResponse} errorResponse - Ответ с ошибкой от API.
	 */
	const handleApiErrors = (errorResponse: ApiErrorResponse) => {
		const newErrors: ILoginErrors = { ...errors };

		if (errorResponse.errors) {
			for (let i = 0; i < errorResponse.errors.length; i++) {
				const error = errorResponse.errors[i];
				newErrors[error.field as keyof ILoginErrors] = error.message;
			}
		} else {
			if (errorResponse.message === "User not found" && !isRegistration) {
				setIsRegistration(true);
				newErrors.general = "User not found. Registration required.";
			} else {
				newErrors.general = errorResponse.message;
			}
		}

		setErrors(newErrors);
	};

	return (
		<form aria-live="polite" className="auth-form" onSubmit={handleSubmit}>
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
						value={credentials.email}
						onChange={(e) => handleInputChange("email", e.target.value)}
						autoComplete="username"
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? "email-error" : undefined}
					/>

					{errors.email && (
						<div id="email-error" className="auth-form__error" role="alert">
							{errors.email}
						</div>
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
						value={credentials.password}
						onChange={(e) => handleInputChange("password", e.target.value)}
						autoComplete={isRegistration ? "new-password" : "current-password"}
						aria-invalid={!!errors.password}
						aria-describedby={errors.password ? "password-error" : undefined}
					/>

					{errors.password && (
						<div id="password-error" className="auth-form__error" role="alert">
							{errors.password}
						</div>
					)}
				</div>

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
								handleInputChange("confirmPassword", e.target.value)
							}
							autoComplete="new-password"
							aria-invalid={!!errors.confirmPassword}
							aria-describedby={
								errors.confirmPassword ? "confirm-password-error" : undefined
							}
						/>

						{errors.confirmPassword && (
							<div
								id="confirm-password-error"
								className="auth-form__error"
								role="alert"
							>
								{errors.confirmPassword}
							</div>
						)}
					</div>
				)}
			</div>

			{errors.general && (
				<div aria-live="assertive" className="auth-form__error" role="alert">
					{errors.general}
				</div>
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
