import type { InputHTMLAttributes } from "react";
import "./UInput.scss";

interface UInputProps extends InputHTMLAttributes<HTMLInputElement> {
	// Здесь можно добавить кастомные props, если они нужны
}

function UInput(props: UInputProps) {
	return <input className="u-input" {...props} />;
}

export default UInput;
