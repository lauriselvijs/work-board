import { Option, OptionProps } from "@/types/Components";
import { Employee, Role } from "@/types/Employee";

export const ROLES_VALUES: Readonly<{ [key in Role]: string }> = {
    employee: "Employee",
    manager: "Manager",
    admin: "Admin",
};

export const DEFAULT_ROLE: Readonly<Option<Role>> = {
    id: "employee",
    value: ROLES_VALUES.employee,
};

export const roles: OptionProps<Role> = [
    { value: DEFAULT_ROLE },
    { value: { id: "manager", value: ROLES_VALUES.manager } },
    { value: { id: "admin", value: ROLES_VALUES.admin } },
];

export const sortEmployeeBy: OptionProps<keyof Employee> = [
    { value: { id: "name", value: "Name" } },
    { value: { id: "created_at", value: "Created at" } },
    { value: { id: "updated_at", value: "Updated at" } },
];

export const filterEmployeeBy: OptionProps<Role | "all"> = [
    { value: { id: "all", value: "All" } },
    ...roles,
];
