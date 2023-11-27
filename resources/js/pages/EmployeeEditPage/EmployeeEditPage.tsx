import { Head, router } from "@inertiajs/react";

import Button from "@/components/Button";
import { PageProps } from "@/types";
import { Employee } from "@/types/Employee";
import NavLink from "@/components/NavLink";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import Select from "@/components/Select";
import { roles } from "@/config/employee";
import { useEmployeeForm } from "@/hooks/useEmployeeForm";
import ToggleButton from "@/components/ToggleButton";
import { useToggle } from "react-use";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import { Country, getCountryCallingCode } from "react-phone-number-input";
import { countryOptions } from "@/utils/phoneNumberInput";
import labels from "react-phone-number-input/locale/en";
import ToggleSettings from "./partials/ToggleSettings";

const EmployeeEditPage = ({ employee }: PageProps<{ employee: Employee }>) => {
    const {
        data,
        onNameChange,
        onEmailChange,
        onNameBlur,
        onEmailBlur,
        onSubmit,
        onPhoneNumberBlur,
        onPhoneNumberChange,
        disabled,
        errors,
        onRoleChange,
        selectedRole,
        onPhoneNumberCountryChange,
    } = useEmployeeForm(employee);

    const renderSubmitBtn = (
        <Button
            className="sm:w-fit w-full mt-8"
            type="submit"
            disabled={disabled}
        >
            Save Changes
        </Button>
    );

    const onSelectChange = (
        option: (typeof countryOptions)[number]["value"]
    ) => {
        onPhoneNumberCountryChange(option.id);
    };

    return (
        <main>
            <Head title="Edit Profile" />
            <div className="flex flex-col gap-8 sm:items-end items-center">
                <form onSubmit={onSubmit} className="card w-full">
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
                    <Select
                        optionList={roles}
                        listbox={{
                            className: "mt-4",
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
                    {renderSubmitBtn}
                </form>
                <ToggleSettings />
                <NavLink
                    linkType="primary-button"
                    href={route("employees.destroy", [employee])}
                >
                    Delete
                </NavLink>
            </div>
        </main>
    );
};

export default EmployeeEditPage;
