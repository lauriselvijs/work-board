import { AtLeast } from "@/utils/types";
import { Employee } from "./Employee";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
    id: number;
    title: string;
    description: string;
    task_id: string;
    assigned_to: number | null;
    assigned_by: number | null;
    assigned_to_employee: AtLeast<Employee, ["id", "name", "username"]> | null;
    assigned_by_employee: AtLeast<Employee, ["id", "name", "username"]>;
    due_date: string | null;
    status: TaskStatus;
    created_at: string;
    updated_at: string;
}

export interface TaskNotification extends Pick<Task, "task_id" | "title"> {
    assigned_by_name: Employee["name"];
    assigned_by_username: Employee["username"];
}
