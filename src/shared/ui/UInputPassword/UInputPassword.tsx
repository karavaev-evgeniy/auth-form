import UInput from "@shared/ui/UInput/UInput";
import type React from "react";
import { useState } from "react";
import "./UInputPassword.scss";
import EyeSlashIcon from "@shared/icons/eye-slash.svg";
import EyeIcon from "@shared/icons/eye.svg";

interface PasswordInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	// Дополнительные пропсы, если нужны
}

function PasswordInput(props: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="u-input-password">
			<UInput
				{...props}
				type={showPassword ? "text" : "password"}
				className="u-input-password__field"
			/>

			<button
				type="button"
				onClick={toggleShowPassword}
				className="u-input-password__toggle"
				title={showPassword ? "Скрыть пароль" : "Показать пароль"}
			>
				{showPassword ? (
					<EyeSlashIcon className="u-input-password__icon" />
				) : (
					<EyeIcon className="u-input-password__icon" />
				)}
			</button>
		</div>
	);
}

export default PasswordInput;
