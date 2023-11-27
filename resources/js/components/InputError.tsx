import { HTMLAttributes } from "react";

export default function InputError({
    message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={`primary-input-error ${className}`}>
            {message}
        </p>
    ) : null;
}
