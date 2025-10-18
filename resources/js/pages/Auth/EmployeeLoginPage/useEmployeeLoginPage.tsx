/* eslint-disable react-hooks/exhaustive-deps */
import { Employee } from "@/types/Employee";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect } from "react";

export interface EmployeeLoginData {
    password: string;
    remember: boolean;
}

export const useEmployeeLoginPage = () => {
    const { data, setData, post, processing, errors, reset } = useForm<
        Pick<Employee, "email"> & EmployeeLoginData
    >({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("email", e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("password", e.target.value);
    };

    const onRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("remember", e.target.checked);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("employee.login.store"));
    };

    return {
        data,
        processing,
        errors,
        onEmailChange,
        onPasswordChange,
        onRememberMeChange,
        onSubmit,
    };
};
