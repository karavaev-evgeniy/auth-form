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
import { UserService } from "@client/entities/user/services/UserService";
import type {
	ILoginCredentials,
	ILoginErrors,
} from "@client/entities/user/types/user";

const schema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

const AuthForm = observer(() => {
	const { authStore } = useContext(StoreContext);
	const navigation = useNavigation();

	const [credentials, setCredentials] = useState<ILoginCredentials>({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<ILoginErrors>({
		email: "",
		password: "",
		general: "",
	});

	const validateForm = () => {
		const { isValid, errors: validationErrors } =
			UserService.validateLoginForm(credentials);

		setErrors((prevErrors) => ({
			...prevErrors,
			email: validationErrors.email || "",
			password: validationErrors.password || "",
			general: validationErrors.general || "",
		}));

		return isValid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (validateForm()) {
			const success = await authStore.login(credentials);
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
							value={credentials.email}
							onChange={(e) =>
								setCredentials({ ...credentials, email: e.target.value })
							}
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
							value={credentials.password}
							onChange={(e) =>
								setCredentials({ ...credentials, password: e.target.value })
							}
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
