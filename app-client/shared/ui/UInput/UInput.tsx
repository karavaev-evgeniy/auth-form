import "./UInput.scss";
import classnames from "classnames";
import type { InputHTMLAttributes } from "react";

export interface UInputProps extends InputHTMLAttributes<HTMLInputElement> {}

function UInput({ className, ...props }: UInputProps) {
	return <input className={classnames("u-input", className)} {...props} />;
}

export default UInput;
