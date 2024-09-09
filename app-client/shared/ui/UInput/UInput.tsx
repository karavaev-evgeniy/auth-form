import type { InputHTMLAttributes } from "react";
import "./UInput.scss";
import classnames from "classnames";

interface UInputProps extends InputHTMLAttributes<HTMLInputElement> {
	// Здесь можно добавить кастомные props, если они нужны
}

function UInput({ className, ...props }: UInputProps) {
	return <input className={classnames("u-input", className)} {...props} />;
}

export default UInput;
