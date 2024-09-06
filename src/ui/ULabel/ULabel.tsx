import type { LabelHTMLAttributes } from "react";
import "./ULabel.scss";

interface ULabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	// Здесь можно добавить кастомные props, если они нужны
}

function ULabel(props: ULabelProps) {
	return <label className="u-label" {...props} />;
}

export default ULabel;
