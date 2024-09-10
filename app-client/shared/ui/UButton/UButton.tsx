import classnames from "classnames";
import type { ButtonHTMLAttributes } from "react";
import "./UButton.scss";

interface UButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function UButton({ children, className, ...props }: UButtonProps) {
	return (
		<button className={classnames("u-button", className)} {...props}>
			{children}
		</button>
	);
}

export default UButton;
