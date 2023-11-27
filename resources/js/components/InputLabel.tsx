import { LabelHTMLAttributes } from "react";

export default function InputLabel({
    value,
    className = "",
    children,
    required,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
    value?: string;
    required?: boolean;
}) {
    const renderRequired = required && (
        <span className="text-error pl-1">*</span>
    );

    return (
        <label {...props} className={`primary-input-label ${className}`}>
            {value ? value : children}
            {renderRequired}
        </label>
    );
}
