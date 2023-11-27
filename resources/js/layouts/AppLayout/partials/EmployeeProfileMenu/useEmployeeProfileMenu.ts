import { PageProps } from "@/types";
import { Navigation } from "@/types/Components";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export const useEmployeeProfileMenu = () => {
    const {
        auth: { employee },
    } = usePage<PageProps>().props;
    let [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const currentRoute = route().current();

    const navigation: Navigation[] = [
        {
            name: "Employees",
            href: route("employees.index"),
            route: "employees.index",
        },

        {
            name: "Tasks",
            href: route("employee.tasks", employee.username),
            route: "employee.tasks",
        },
    ];
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [currentRoute]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prevMobileMenuOpen) => !prevMobileMenuOpen);
    };

    const profileOptions: Navigation[] = [
        {
            name: "Edit Profile",
            href: route("employees.edit", employee.username),
            route: "employees.edit",
        },
        {
            name: "Logout",
            href: route("employee.logout"),
            route: "employee.logout",
            as: "button",
            role: "button",
            method: "post",
        },
    ];

    return {
        currentRoute,
        profileOptions,
        navigation,
        employee,
        mobileMenuOpen,
        toggleMobileMenu,
    };
};
