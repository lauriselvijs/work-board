import { Head } from "@inertiajs/react";

import Button from "@/components/Button";
import { useEmployeeConfirmPage } from "./useEmployeeConfirmPage";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";

const EmployeeConfirmPage = () => {
    const { data, errors, processing, onSubmit, onPasswordChange } =
        useEmployeeConfirmPage();

    return (
        <main className="flex flex-col sm:justify-center items-center flex-1">
            <Head title="Confirm" />
            <form
                onSubmit={onSubmit}
                className="w-full sm:max-w-md mt-6 px-6 py-4 bg-primary-bg shadow-md overflow-hidden sm:rounded-lg flex flex-col"
            >
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
                <Button className="mt-4" disabled={processing}>
                    Confirm
                </Button>
            </form>
        </main>
    );
};

export default EmployeeConfirmPage;
