import { ChangeEvent, FormEventHandler, useState } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import { DEFAULT_TASK_STATUS, TASK_STATUS_ID } from "@/config/task";
import { Employee } from "@/types/Employee";
import { Task, TaskStatus } from "@/types/Task";
import { Option } from "@/types/Components";
import { useNavigateAway } from "@/hooks/useBrowser";

export const useTaskForm = (
    employeeId?: Employee["id"],
    taskToUpdate?: Task
) => {
    const isEdit = !!taskToUpdate;

    const initialFormData = {
        title: taskToUpdate?.title ?? "",
        description: taskToUpdate?.description ?? "",
        assigned_to: employeeId ?? null,
        due_date: taskToUpdate?.due_date ?? "",
        status: taskToUpdate?.status ?? TASK_STATUS_ID.todo,
    };

    const {
        data,
        setData,
        processing,
        errors,
        reset,
        validate,
        submit,
        isDirty,
        setDefaults,
    } = useForm(
        isEdit ? "put" : "post",
        isEdit ? route("tasks.update", taskToUpdate) : route("tasks.store"),
        initialFormData
    );

    useNavigateAway(isDirty);

    const [dueDate, setDueDate] = useState(taskToUpdate?.due_date ?? "");
    const [selectedStatus, setSelectedStatus] =
        useState<Option<TaskStatus>>(DEFAULT_TASK_STATUS);

    const onSelectedStatusChange = (value: Option<TaskStatus>) => {
        setSelectedStatus(value);
        setData("status", value.id);
    };

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData("title", e.target.value);
    };

    const onTitleBlur = () => {
        validate("title");
    };

    const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData("description", e.target.value);
    };

    const onDescriptionBlur = () => {
        validate("description");
    };

    const onDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const utcDate = new Date(e.target.value).toISOString();

        setDueDate(e.target.value);
        setData("due_date", utcDate);
    };

    const onDueDateBlur = () => {
        validate("due_date");
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        submit({
            onSuccess: () => {
                if (isEdit) {
                    setDefaults();
                } else {
                    reset();
                    setSelectedStatus(DEFAULT_TASK_STATUS);
                }
            },
            preserveScroll: true,
        });
    };

    const disabled = isEdit ? processing || !isDirty : processing;

    return {
        data,
        disabled,
        errors,
        onTitleChange,
        onDescriptionChange,
        onDueDateChange,
        onDueDateBlur,
        onDescriptionBlur,
        onTitleBlur,
        onSubmit,
        dueDate,
        onSelectedStatusChange,
        selectedStatus,
    };
};
