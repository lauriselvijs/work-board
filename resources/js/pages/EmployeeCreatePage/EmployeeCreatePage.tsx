import { Head } from "@inertiajs/react";

import Button from "@/components/Button";
import GuestLayout from "@/layouts/GuestLayout";
import NavLink from "@/components/NavLink";

import PhoneNumberInput from "@/components/PhoneNumberInput";
import Select from "@/components/Select";
import { roles } from "@/config/employee";
import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import InputError from "@/components/InputError";
import { Country, getCountryCallingCode } from "react-phone-number-input";
import labels from "react-phone-number-input/locale/en";
import { countryOptions } from "@/utils/phoneNumberInput";

const EmployeeCreatePage = () => {
    const {
        data,
        disabled,
        errors,
        onNameChange,
        onNameBlur,
        onPasswordConfirmationChange,
        onPasswordConfirmationBlur,
        onEmailChange,
        onEmailBlur,
        onPasswordChange,
        onPasswordBlur,
        onSubmit,
        onPhoneNumberBlur,
        onPhoneNumberChange,
        onRoleChange,
        selectedRole,
        onPhoneNumberCountryChange,
    } = useEmployeeForm();

    const renderAlreadyRegisteredLink = (
        <NavLink
            href={route("employee.login")}
            className="text-center sm:text-left"
        >
            Already registered?
        </NavLink>
    );

    const renderRegisterButton = (
        <Button type="submit" className="ml-4" disabled={disabled}>
            Register
        </Button>
    );

    const onSelectChange = (
        option: (typeof countryOptions)[number]["value"]
    ) => {
        onPhoneNumberCountryChange(option.id);
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={onSubmit}>
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={onNameChange}
                        onBlur={onNameBlur}
                        required
                        isFocused
                    />
                    <InputError
                        message={errors.name}
                        className="mt-2"
                        aria-describedby="name"
                    />
                </div>
                <PhoneNumberInput
                    onBlur={onPhoneNumberBlur}
                    onChange={onPhoneNumberChange}
                    value={data.phone_number}
                    phoneNumberCountry={data.phone_number_country}
                    required
                    errorChildren={
                        <InputError
                            aria-describedby="phone_number"
                            message={errors.phone_number}
                            className="mt-2"
                        />
                    }
                >
                    <Select
                        optionList={countryOptions}
                        listbox={{
                            name: "status",
                            onChange: onSelectChange,
                        }}
                        button={{
                            className: "mt-1 w-full",
                        }}
                        buttonChildren={
                            labels[data.phone_number_country as Country] +
                            " +" +
                            getCountryCallingCode(
                                data.phone_number_country as Country
                            )
                        }
                    />
                </PhoneNumberInput>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        name="email"
                        value={data.email}
                        type="email"
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={onEmailChange}
                        onBlur={onEmailBlur}
                        required
                        isFocused
                    />
                    <InputError
                        aria-describedby="email"
                        message={errors.email}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <Select
                        optionList={roles}
                        listbox={{
                            value: selectedRole,
                            name: "role",
                            onChange: onRoleChange,
                        }}
                        button={{
                            className: "mt-1 w-full",
                        }}
                        labelChildren={"Role"}
                        buttonChildren={selectedRole.value}
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={onPasswordChange}
                        onBlur={onPasswordBlur}
                    />
                    <InputError
                        aria-describedby="password"
                        message={errors.password}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={onPasswordConfirmationChange}
                        onBlur={onPasswordConfirmationBlur}
                        required
                    />

                    <InputError
                        aria-describedby="password_confirmation"
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                <div className="flex sm:items-center justify-between mt-4 gap-2 flex-col sm:flex-row">
                    {renderAlreadyRegisteredLink}
                    {renderRegisterButton}
                </div>
            </form>
        </GuestLayout>
    );
};

export default EmployeeCreatePage;
