import Button from "@/components/Button";
import NavLink from "@/components/NavLink";
import TaskForm from "@/components/TaskForm";
import { TASK_STATUS_VALUE } from "@/config/task";
import { Task as ITask } from "@/types/Task";
import { useTask } from "./useTask";
import FormTransition from "@/components/FormTransition";
import { Employee } from "@/types/Employee";
import { useToggle } from "react-use";

const Task = ({
    task,
    assignEmptyTaskTo,
    assignEmptyTaskToEmployeeId,
}: {
    task: ITask;
    assignEmptyTaskTo: Employee["username"];
    assignEmptyTaskToEmployeeId: Employee["id"];
}) => {
    const {
        onShowFormBtnClick,
        toLocal,
        canModify,
        showForm,
        canAssign,
        overdue,
    } = useTask(task);

    const taskInfo = [
        { id: "task_id", label: "Task ID", value: task.task_id },
        { id: "description", label: "Description", value: task.description },

        {
            id: "due-date",
            label: "Due Date",
            value: task.due_date && toLocal(task.due_date).fromNow(),
            overdue: overdue(),
        },
        {
            id: "assigned-by",
            label: "Assigned By",
            value: task.assigned_by_employee.name,
            username: task.assigned_by_employee.username,
        },
        {
            id: "assigned-to",
            label: "Assigned To",
            value: task?.assigned_to_employee?.name,
            username: task?.assigned_to_employee?.username,
        },
        {
            id: "created",
            label: "Created",
            value: toLocal(task.created_at).fromNow(),
        },
        {
            id: "updated",
            label: "Updated",
            value: toLocal(task.updated_at).fromNow(),
        },
        {
            id: "status",
            label: "Status",
            value: TASK_STATUS_VALUE[task.status],
        },
    ];

    const renderTaskInfo = taskInfo.map(
        ({ id, username, label, overdue, value }) => (
            <p key={id}>
                {username ? (
                    <>
                        <span className="font-bold">{label}:</span>
                        <a
                            className="primary-link"
                            href={route("employee.tasks", username)}
                        >
                            {" "}
                            {value}
                        </a>
                    </>
                ) : (
                    <>
                        {" "}
                        <span className="font-bold">{label}:</span>{" "}
                        <span
                            className={`${overdue && "text-error font-bold"}`}
                        >
                            {value}{" "}
                        </span>
                    </>
                )}
            </p>
        )
    );

    const [isLoading, setIsLoading] = useToggle(false);
    // Todo:
    // [ ] - Add un-sign task option
    const renderAssignTaskBtn = canAssign && (
        <NavLink
            disabled={isLoading}
            onBefore={setIsLoading}
            onFinish={setIsLoading}
            linkType="primary-button"
            type="button"
            as="button"
            href={route("tasks.update", task)}
            method="put"
            data={{
                ...task,
                assigned_to: assignEmptyTaskToEmployeeId,
            }}
            preserveScroll
            preserveState
        >
            Assign Task To {assignEmptyTaskTo}
        </NavLink>
    );

    const renderTaskForm = canModify && (
        <FormTransition show={showForm}>
            <div>
                <TaskForm
                    submitBtnText={"Update"}
                    employeeId={task?.assigned_to_employee?.id}
                    taskToUpdate={task}
                />
            </div>
        </FormTransition>
    );

    const renderTaskControls = canModify && (
        <>
            <div className="flex flex-col gap-2">
                <Button onClick={onShowFormBtnClick}>
                    {showForm ? "Cancel" : "Edit"}
                </Button>
                <NavLink
                    as="button"
                    preserveScroll
                    preserveState
                    method="delete"
                    linkType="primary-button"
                    href={route("tasks.destroy", task)}
                >
                    Delete
                </NavLink>
            </div>
        </>
    );
    return (
        <div>
            <div className="card flex flex-col gap-8 w-full h-full justify-start">
                <h1>{task.title}</h1>
                <div className="flex flex-col gap-2">{renderTaskInfo}</div>
                {renderTaskForm}
                {renderTaskControls}
                {renderAssignTaskBtn}
            </div>
        </div>
    );
};

export default Task;
