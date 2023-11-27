import { Option, OptionProps } from "@/types/Components";
import { Task, TaskStatus } from "@/types/Task";

export const TASK_STATUS_ID: { [key in string]: TaskStatus } = {
    todo: "todo",
    in_progress: "in_progress",
    done: "done",
} as const;

export const TASK_STATUS_VALUE: { [key in TaskStatus]: string } = {
    todo: "Todo",
    in_progress: "In Progress",
    done: "Done",
} as const;

/** Default task status value for storing task */
export const DEFAULT_TASK_STATUS: Option<TaskStatus> = {
    id: TASK_STATUS_ID.todo,
    value: TASK_STATUS_VALUE.todo,
} as const;

export const taskStatusesToFilter: OptionProps<TaskStatus> = [
    { value: DEFAULT_TASK_STATUS },
    {
        value: {
            id: TASK_STATUS_ID.in_progress,
            value: TASK_STATUS_VALUE.in_progress,
        },
    },
    { value: { id: TASK_STATUS_ID.done, value: TASK_STATUS_VALUE.done } },
];

export const sortTaskBy: OptionProps<keyof Task> = [
    { value: { id: "title", value: "Title" } },
    { value: { id: "updated_at", value: "Updated at" } },
    { value: { id: "created_at", value: "Created at" } },
    { value: { id: "due_date", value: "Due at" } },
];

export const filterTaskBy: OptionProps<TaskStatus | "all"> = [
    { value: { id: "all", value: "All" } },
    ...taskStatusesToFilter,
];

export const filterTaskAssigneesBy: OptionProps = [
    { value: { id: "all", value: "All" } },
    { value: { id: "by_employee", value: "By Employee" } },
    { value: { id: "to_employee", value: "To Employee" } },
    {
        value: {
            id: "by_employee_and_to_employee",
            value: "To Employee & By Employee",
        },
    },
    {
        value: {
            id: "unsigned_tasks",
            value: "Your Unsigned Tasks",
        },
    },
];
