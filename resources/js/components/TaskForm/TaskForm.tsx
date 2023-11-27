import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useTaskForm } from "./useTaskForm";
import { Employee } from "@/types/Employee";
import { Task } from "@/types/Task";
import { taskStatusesToFilter } from "@/config/task";
import Select from "../Select";

interface TaskFormProps {
    employeeId?: Employee["id"];
    taskToUpdate?: Task;
    submitBtnText?: string;
}

const TaskForm = ({
    employeeId,
    taskToUpdate,
    submitBtnText,
}: TaskFormProps) => {
    const {
        data,
        disabled,
        errors,
        onTitleChange,
        onDescriptionChange,
        onDueDateChange,
        onSubmit,
        onDescriptionBlur,
        onDueDateBlur,
        onTitleBlur,
        dueDate,
        selectedStatus,
        onSelectedStatusChange,
    } = useTaskForm(employeeId, taskToUpdate);

    const renderTitleInput = (
        <div className="mt-4">
            <InputLabel htmlFor="title" value="Title" />

            <TextInput
                id="title"
                name="title"
                type="text"
                value={data.title}
                className="mt-1 block w-full"
                autoComplete="off"
                onBlur={onTitleBlur}
                onChange={onTitleChange}
                required
            />

            <InputError
                aria-describedby="title"
                message={errors.title}
                className="mt-2"
            />
        </div>
    );

    const renderDescriptionInput = (
        <div className="mt-4">
            <InputLabel htmlFor="description" value="Description" />

            <textarea
                id="description"
                name="description"
                value={data.description}
                className="primary-text-input mt-1 block w-full"
                autoComplete="off"
                required
                onChange={onDescriptionChange}
                onBlur={onDescriptionBlur}
            />

            <InputError
                aria-describedby="description"
                message={errors.description}
                className="mt-2"
            />
        </div>
    );

    const renderDueDateInput = (
        <div className="mt-4">
            <InputLabel htmlFor="due_date" value="Due Date" />
            <TextInput
                id="due_date"
                type="datetime-local"
                name="due_date"
                value={dueDate}
                className="primary-text-input mt-1 block w-full"
                autoComplete="off"
                required
                onChange={onDueDateChange}
                onBlur={onDueDateBlur}
            />

            <InputError
                aria-describedby="due_date"
                message={errors.due_date}
                className="mt-2"
            />
        </div>
    );

    const renderCreateButton = (
        <Button type="submit" disabled={disabled}>
            {submitBtnText ?? "Create Task"}
        </Button>
    );

    const renderSelectTodoStatus = (
        <div className="mt-4">
            <Select
                optionList={taskStatusesToFilter}
                listbox={{
                    value: selectedStatus,
                    name: "status",
                    onChange: onSelectedStatusChange,
                }}
                button={{
                    className: "mt-1 w-full",
                }}
                labelChildren={"Status"}
                buttonChildren={selectedStatus.value}
            />
        </div>
    );

    return (
        <div className="card">
            <form onSubmit={onSubmit}>
                {renderTitleInput}
                {renderSelectTodoStatus}
                {renderDescriptionInput}
                {renderDueDateInput}
                <div className="flex sm:items-center justify-between mt-4 gap-2 flex-col sm:flex-row">
                    {renderCreateButton}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
