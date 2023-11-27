import { ButtonHTMLAttributes } from "react";

/* config ref=_button.scss */
const btnTypeClasses = {
    primary: "primary-btn",
    "primary-trans": "primary-btn-trans",
    "secondary-trans": "secondary-btn-trans",
    secondary: "secondary-btn",
};

const Button = ({
    btnType = "primary",
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    btnType?: keyof typeof btnTypeClasses;
}) => {
    return (
        <button
            {...props}
            className={`${btnTypeClasses[btnType]} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
