import { Head } from "@inertiajs/react";

import { PageProps } from "@/types";
import { Employee } from "@/types/Employee";
import NavLink from "@/components/NavLink";

import { useEmployeeShowPage } from "./useEmployeeShowPage";

const EmployeeShowPage = ({ employee }: PageProps<{ employee: Employee }>) => {
    const { processing, onProcessing } = useEmployeeShowPage();

    return (
        <main>
            <Head title="Profile" />
            <div className="card flex flex-col gap-4 w-full max-w-xl">
                <h1>{employee.name}'s Profile</h1>
                <div className="flex flex-col gap-2">
                    <p>
                        <span className="font-bold">Username:</span>{" "}
                        {employee.username}
                    </p>
                    <p>
                        <span className="font-bold">Email:</span>{" "}
                        {employee.email}
                    </p>
                    <p>
                        <span className="font-bold">Role:</span> {employee.role}
                    </p>
                    <p>
                        <span className="font-bold">Created:</span>{" "}
                        {employee.created_at}
                    </p>
                    <p>
                        <span className="font-bold">Updated:</span>{" "}
                        {employee.updated_at}
                    </p>
                </div>
                <NavLink
                    onStart={onProcessing}
                    onFinish={onProcessing}
                    disabled={processing}
                    linkType="primary-button"
                    as="button"
                    role="button"
                    href={route("employees.destroy", employee)}
                    method="delete"
                >
                    Delete
                </NavLink>
            </div>
        </main>
    );
};

export default EmployeeShowPage;
