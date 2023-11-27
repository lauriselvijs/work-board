import { ReactNode } from "react";
import { Employee } from "./Employee";
import { Flash } from "./Components";

type PageProps<T extends Record<string, unknown> = Record<string, unknown>> =
    T & {
        auth: {
            employee: Employee;
        };
        flash: Flash;
    };

type Page = {
    default: {
        layout?: (page: ReactNode) => JSX.Element;
    };
};
