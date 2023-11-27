import NavLink from "@/components/NavLink";
import { useDate } from "@/hooks/useDate";
import { useEmployeeNamePossessiveCase } from "@/hooks/useEmployee";
import { Employee as IEmployee } from "@/types/Employee";

const Employee = ({
    employee,
    showTasksBtn = true,
}: {
    employee: IEmployee;
    showTasksBtn?: boolean;
}) => {
    const { toLocal } = useDate();
    const employeeName = useEmployeeNamePossessiveCase(
        employee.username,
        employee.name
    );

    const employeeInfo = [
        { id: "email", label: "Email", value: employee.email, link: "mailto:" },
        {
            id: "phone-number",
            label: "Phone Number",
            value: employee.phone_number,
            link: "tel:",
        },
        { id: "role", label: "Role", value: employee.role },
        {
            id: "created",
            label: "Created",
            value: toLocal(employee.created_at).fromNow(),
        },
        {
            id: "updated",
            label: "Updated",
            value: toLocal(employee.updated_at).fromNow(),
        },
    ];

    const renderEmployeeInfo = employeeInfo.map((info) => (
        <p key={info.id}>
            {info?.link ? (
                <>
                    <span className="font-bold">{info.label}:</span>
                    <a
                        title={"Contact"}
                        className="primary-link"
                        href={info.link + info.value}
                    >
                        {" "}
                        {info.value}
                    </a>
                </>
            ) : (
                <>
                    {" "}
                    <span className="font-bold">{info.label}:</span>{" "}
                    {info.value}{" "}
                </>
            )}
        </p>
    ));

    const renderShowTasks = showTasksBtn && (
        <NavLink
            linkType="primary-button"
            href={route("employee.tasks", employee.username)}
            className="w-full"
        >
            Show tasks
        </NavLink>
    );

    return (
        <div>
            <div className="card flex flex-col gap-8 w-full h-full justify-between">
                <h1>{employeeName} Profile</h1>
                <div className="flex flex-col gap-2">{renderEmployeeInfo}</div>
                <div className="flex flex-col gap-2">{renderShowTasks}</div>
            </div>
        </div>
    );
};

export default Employee;
