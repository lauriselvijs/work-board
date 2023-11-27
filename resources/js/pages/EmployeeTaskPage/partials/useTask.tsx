import { TASK_STATUS_VALUE } from "@/config/task";
import { useDate } from "@/hooks/useDate";
import { PageProps } from "@/types";
import { Task } from "@/types/Task";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useToggle } from "react-use";

export const useTask = (task: Task) => {
    const { auth } = usePage<PageProps>().props;
    const [showForm, toggleShowForm] = useToggle(false);

    const { toLocal } = useDate();

    const onShowFormBtnClick = () => {
        toggleShowForm();
    };

    const overdue = () => {
        return !!(
            task.due_date &&
            dayjs().isAfter(task.due_date) &&
            TASK_STATUS_VALUE[task.status] !== TASK_STATUS_VALUE.done
        );
    };

    const canModify = auth.employee.id === task.assigned_by_employee.id;
    const canAssign = task?.assigned_to_employee === null;

    return {
        onShowFormBtnClick,
        toLocal,
        canModify,
        showForm,
        canAssign,
        overdue,
    };
};
