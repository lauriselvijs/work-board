export type Role = "employee" | "manager" | "admin";

export interface Employee {
    /** Unique id of employee*/
    id: number;
    name: string;
    email: string;
    phone_number: string;
    phone_number_country: string;
    username: string;
    role: Role;
    email_notification: boolean;
    push_notification: boolean;
    created_at: string;
    updated_at: string;
}
