import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import { Option, PhoneInput } from "@/types/Components";
import { Employee, Role } from "@/types/Employee";
import { DEFAULT_ROLE, roles } from "@/config/employee";
import { Country } from "react-phone-number-input";
import { DEFAULT_SELECT_COUNTRY } from "@/config/components";
import { useNavigateAway } from "./useBrowser";

const initialFormData = {
    name: "",
    role: DEFAULT_ROLE.id,
    email: "",
    phone_number: "",
    phone_number_country: DEFAULT_SELECT_COUNTRY,
    password: "",
    password_confirmation: "",
};

export const useEmployeeForm = (employeeToUpdate?: Employee) => {
    const isEdit = !!employeeToUpdate;

    if (isEdit) {
        initialFormData.name = employeeToUpdate.name;
        initialFormData.role = employeeToUpdate.role;
        initialFormData.email = employeeToUpdate.email;
        initialFormData.phone_number = employeeToUpdate.phone_number;
        initialFormData.phone_number_country =
            employeeToUpdate.phone_number_country;
        initialFormData.phone_number = employeeToUpdate.phone_number;
    }

    const {
        data,
        processing,
        errors,
        reset,
        validate,
        submit,
        setData,
        setDefaults,
        isDirty,
    } = useForm(
        isEdit ? "put" : "post",
        isEdit
            ? route("employees.update", employeeToUpdate)
            : route("employees.store"),
        initialFormData
    );

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const disabled = isEdit ? processing || !isDirty : processing;

    const employeeSelectedRole =
        roles.find((role) => role.value.id === employeeToUpdate?.role)?.value ||
        DEFAULT_ROLE;

    const [selectedRole, setSelectedRole] =
        useState<Option<Role>>(employeeSelectedRole);

    useNavigateAway(isDirty && isEdit);

    const onRoleChange = (value: Option<Role>) => {
        setSelectedRole(value);
        setData("role", value.id);
    };

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("name", e.target.value);
    };

    const onNameBlur = () => {
        validate("name");
    };

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("email", e.target.value);
    };

    const onEmailBlur = () => {
        validate("email");
    };

    const onPhoneNumberChange = (value: PhoneInput) => {
        setData("phone_number", value);
    };

    const onPhoneNumberCountryChange = (value: Country) => {
        setData("phone_number_country", value);
        validate("phone_number_country");
        validate("phone_number");
    };

    const onPhoneNumberBlur = () => {
        validate("phone_number");
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("password", e.target.value);
    };

    const onPasswordBlur = () => {
        validate("password");
    };

    const onPasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("password_confirmation", e.target.value);
    };

    const onPasswordConfirmationBlur = () => {
        validate("password_confirmation");
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        submit({
            onSuccess: () => {
                if (isEdit) {
                    setDefaults();
                } else {
                    reset();
                }
            },
        });
    };

    return {
        disabled,
        data,
        errors,
        onPhoneNumberChange,
        onPhoneNumberBlur,
        onNameChange,
        onNameBlur,
        onPasswordConfirmationChange,
        onPasswordConfirmationBlur,
        onEmailChange,
        onEmailBlur,
        onPasswordChange,
        onPasswordBlur,
        onPhoneNumberCountryChange,
        onSubmit,
        setData,
        selectedRole,
        onRoleChange,
    };
};
