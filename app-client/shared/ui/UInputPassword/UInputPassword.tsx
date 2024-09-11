import UInput from "@client/shared/ui/UInput/UInput";
import type React from "react";
import { useState } from "react";
import "./UInputPassword.scss";
import EyeSlashIcon from "@client/shared/icons/eye-slash.svg";
import EyeIcon from "@client/shared/icons/eye.svg";

interface UInputPasswordProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

function UInputPassword({ id, ...props }: UInputPasswordProps) {
	const [showPassword, setShowPassword] = useState(false);
	const toggleId = `${id}-toggle`;

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="u-input-password">
			<UInput
				id={id}
				type={showPassword ? "text" : "password"}
				className="u-input-password__field"
				{...props}
			/>

			<button
				id={toggleId}
				type="button"
				onClick={toggleShowPassword}
				className="u-input-password__toggle"
				title={showPassword ? "Hide password" : "Show password"}
				aria-label={showPassword ? "Hide password" : "Show password"}
				aria-pressed={showPassword}
			>
				{showPassword ? (
					// @ts-ignore
					<EyeSlashIcon className="u-input-password__icon" />
				) : (
					// @ts-ignore
					<EyeIcon className="u-input-password__icon" />
				)}
			</button>
		</div>
	);
}

export default UInputPassword;
