import UInput from "@client/shared/ui/UInput/UInput";
import type React from "react";
import { useState } from "react";
import "./UInputPassword.scss";
import EyeSlashIcon from "@client/shared/icons/eye-slash.svg";
import EyeIcon from "@client/shared/icons/eye.svg";

interface UInputPasswordProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

function UInputPassword({ ...props }: UInputPasswordProps) {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="u-input-password">
			<UInput
				type={showPassword ? "text" : "password"}
				className="u-input-password__field"
				{...props}
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

export default UInputPassword;
