import { ButtonHTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import './UButton.css'

interface UButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

function UButton({ children, className, ...props }: UButtonProps) {
    return (
        <button className={classnames('u-button', className)} {...props}>
            {children}
        </button>
    );
}

export default UButton;