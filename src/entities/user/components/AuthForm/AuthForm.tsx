import UButton from "@shared/ui/UButton/UButton.tsx";
import UInput from "@shared/ui/UInput/UInput.tsx";
import ULabel from "@shared/ui/ULabel/ULabel.tsx";
import { useState } from "react";
import "./AuthForm.scss";
import { z } from "zod";
import UInputPassword from "../../../../shared/ui/UInputPassword/UInputPassword.tsx";

const schema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

function AuthForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ email: "", password: "" });

	const validateForm = () => {
		try {
			schema.parse({ email, password });
			setErrors({ email: "", password: "" });

			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors = { email: "", password: "" };

				for (const err of error.errors) {
					if (err.path[0] === "email") newErrors.email = err.message;
					if (err.path[0] === "password") newErrors.password = err.message;
				}

				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (validateForm()) {
			console.log("Form is valid. Submitting...");
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

				<div className="auth-form__controls">
					<UButton className="auth-form__button" type="submit">
						Login
					</UButton>
				</div>
			</form>
		</>
	);
}

export default AuthForm;
