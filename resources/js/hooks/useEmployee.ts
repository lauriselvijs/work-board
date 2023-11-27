import { PageProps } from "@/types";
import { Employee } from "@/types/Employee";
import { usePage } from "@inertiajs/react";

export const useEmployeeNamePossessiveCase = (
    employeeUsername: Employee["username"],
    employeeName: Employee["name"]
) => {
    const {
        auth: {
            employee: { username: authEmployeeUsername },
        },
    } = usePage<PageProps>().props;

    return authEmployeeUsername === employeeUsername
        ? "Your"
        : employeeName + "'s";
};

export const useEmployeeNamePronoun = (
    employeeUsername: Employee["username"],
    employeeName: Employee["name"]
) => {
    const {
        auth: {
            employee: { username: authEmployeeUsername },
        },
    } = usePage<PageProps>().props;

    return authEmployeeUsername === employeeUsername ? "You" : employeeName;
};
