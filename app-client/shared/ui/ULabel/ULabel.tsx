import classnames from "classnames";
import type { LabelHTMLAttributes } from "react";

interface ULabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

function ULabel({ className, ...props }: ULabelProps) {
	return <label className={classnames("u-label", className)} {...props} />;
}

export default ULabel;
