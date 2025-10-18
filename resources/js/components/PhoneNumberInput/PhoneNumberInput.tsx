import InputLabel from "../InputLabel";
import { Input, PhoneInput as PhoneInputType } from "@/types/Components";
import PhoneInput, { Country } from "react-phone-number-input/input";
import { ReactNode } from "react";

const PhoneNumberInput = ({
    onChange,
    onBlur,
    value,
    required = false,
    phoneNumberCountry,
    children,
    errorChildren,
}: Omit<Input, "onChange"> & {
    value: Country;
    phoneNumberCountry: Country;
    onChange: (value: PhoneInputType) => void;
    errorChildren: ReactNode;
}) => {
    return (
        <div className="mt-4">
            <InputLabel htmlFor="phone_number" value="Phone Number" />
            {children}
            <PhoneInput
                className="mt-2 block w-full primary-text-input"
                id="phone_number"
                name="phone_number"
                required={required}
                country={phoneNumberCountry}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {errorChildren}
        </div>
    );
};

export default PhoneNumberInput;
