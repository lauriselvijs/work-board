import { ChangeEvent, FormEvent } from "react";
import { useForm } from "@inertiajs/react";

export const useEmployeeConfirmPage = () => {
    const { data, errors, processing, setData, post } = useForm({
        password: "",
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("password.check"));
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("password", e.target.value);
    };

    return { data, errors, processing, onSubmit, onPasswordChange };
};
