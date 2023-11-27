import { Head } from "@inertiajs/react";

import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import GuestLayout from "@/layouts/GuestLayout/GuestLayout";
import NavLink from "@/components/NavLink";

import { useEmployeeLoginPage } from "./useEmployeeLoginPage";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";

const EmployeeLoginPage = () => {
    const {
        data,
        processing,
        errors,
        onEmailChange,
        onPasswordChange,
        onRememberMeChange,
        onSubmit,
    } = useEmployeeLoginPage();

    const renderRememberMeInput = (
        <div className="block mt-4">
            <label className="flex items-center">
                <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={onRememberMeChange}
                />
                <span className="ml-2 primary-text-sm">Remember me</span>
            </label>
        </div>
    );

    const renderDontHaveAccountLink = (
        <NavLink href={route("employees.create")}>Don't have account?</NavLink>
    );

    const renderLoginBtn = (
        <Button className="ml-4" disabled={processing}>
            Log in
        </Button>
    );

    return (
        <GuestLayout>
            <Head title="Log in" />
            <form onSubmit={onSubmit}>
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
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={onPasswordChange}
                    />
                    <InputError
                        aria-describedby="password"
                        message={errors.password}
                        className="mt-2"
                    />
                </div>
                {renderRememberMeInput}
                <div className="flex items-center justify-between mt-4">
                    {renderDontHaveAccountLink}
                    {renderLoginBtn}
                </div>
            </form>
        </GuestLayout>
    );
};

export default EmployeeLoginPage;
