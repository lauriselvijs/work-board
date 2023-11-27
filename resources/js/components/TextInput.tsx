import { Input } from "@/types/Components";
import { useEffect, useRef } from "react";

const TextInput = ({
    type = "text",
    className = "",
    isFocused = false,
    ...props
}: Input) => {
    const localRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`primary-text-input ${className}`}
            ref={localRef}
        />
    );
};
export default TextInput;
