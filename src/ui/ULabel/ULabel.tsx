import { LabelHTMLAttributes } from 'react';
import "./UInput.css";

interface ULabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    // Здесь можно добавить кастомные props, если они нужны
}

function ULabel(props: ULabelProps) {
    return <label className="u-label" {...props} />;
}

export default ULabel;