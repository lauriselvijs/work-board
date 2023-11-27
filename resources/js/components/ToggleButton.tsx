import { Switch } from "@headlessui/react";

const ToggleButton = ({
    disabled = false,
    label,
    enabled,
    onChange,
}: {
    disabled?: boolean;
    label: string;
    enabled: boolean;
    onChange: () => void;
}) => {
    return (
        <Switch.Group>
            <div className="flex items-center">
                <Switch.Label className="mr-4 primary-text">
                    {label}
                </Switch.Label>
                <Switch
                    disabled={disabled}
                    checked={enabled}
                    onChange={onChange}
                    className={`${
                        enabled ? "bg-primary" : "bg-primary-very-dark"
                    } ${
                        disabled ? "opacity-50" : ""
                    } relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2
                     `}
                >
                    <span
                        className={`${
                            enabled ? "translate-x-9" : "translate-x-1"
                        } inline-block h-6 w-6 transform rounded-full bg-primary-very-light transition-transform`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
};

export default ToggleButton;
