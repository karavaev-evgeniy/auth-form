import UButton from "@/ui/UButton/UButton.tsx";
import UInput from "@/ui/UInput/UInput.tsx";
import ULabel from "@/ui/ULabel/ULabel.tsx";
import { useState } from "react";
import "./AuthForm.scss";

function AuthForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const isFormValid = () => {
		return email.trim() !== "" && password.trim() !== "";
	};

	return (
		<>
			<form className="auth-form" action="">
				<div className="auth-form__fields">
					<div className="auth-form__row">
						<ULabel htmlFor="email">Email</ULabel>

						<UInput
							id="email"
							name="email"
							type="email"
							placeholder="@"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="auth-form__row">
						<ULabel htmlFor="password">Password</ULabel>

						<UInput
							id="password"
							name="password"
							type="password"
							placeholder="*"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<div className="auth-form__controls">
					<UButton
						className="auth-form__button"
						type="submit"
						disabled={!isFormValid()}
					>
						Login
					</UButton>
				</div>
			</form>
		</>
	);
}

export default AuthForm;
