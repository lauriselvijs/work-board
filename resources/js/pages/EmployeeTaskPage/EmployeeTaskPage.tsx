import { PageProps } from "@/types";
import { Paginated } from "@/types/Components";
import { Task as ITask, TaskNotification } from "@/types/Task";
import Task from "./partials/Task";
import FilterLayout from "@/layouts/FilterLayout";
import { Employee as IEmployee } from "@/types/Employee";
import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import Employee from "@/components/Employee";
import { filterTaskAssigneesBy, filterTaskBy, sortTaskBy } from "@/config/task";
import { useToggle } from "react-use";
import Select from "@/components/Select";
import { useFilter } from "@/layouts/FilterLayout/useFilterLayout";
import FormTransition from "@/components/FormTransition";
import {
    useEmployeeNamePossessiveCase,
    useEmployeeNamePronoun,
} from "@/hooks/useEmployee";

import { toast } from "react-toastify";
import NotificationMessage from "@/components/NotificationMessage";
import { useNotificationBroadcast } from "@/hooks/useBroadcast";
import { NOTIFICATION_TYPE } from "@/config/notifications";

const { BROADCAST_MESSAGE_TASK_ADDED } = NOTIFICATION_TYPE;

interface Tasks extends Paginated {
    data: ITask[];
}

const ASSIGNEE_FILTER_KEY = "assignees_filter";

const EmployeeTaskPage = ({
    tasks: { data: taskData, ...paginationData },
    employee,
}: PageProps<{ tasks: Tasks; employee: IEmployee }>) => {
    const [showAddTaskForm, setShowAddTaskForm] = useToggle(false);
    const {
        paramValue: filtered,
        onParamChange: onFilterChange,
        isLoading: isLoadingFilter,
    } = useFilter(filterTaskAssigneesBy, ASSIGNEE_FILTER_KEY);

    const profileOwnerName = useEmployeeNamePossessiveCase(
        employee.username,
        employee.name
    );

    const assignEmptyTaskToName = useEmployeeNamePronoun(
        employee.username,
        employee.name
    );

    const notificationId = useNotificationBroadcast<TaskNotification>(
        BROADCAST_MESSAGE_TASK_ADDED
    );

    if (notificationId) {
        toast(<NotificationMessage message={"You have new task!"} />);
    }

    const renderAssigneeFilter = (
        <Select
            optionList={filterTaskAssigneesBy}
            listbox={{
                className: "w-full sm:w-fit",
                disabled: isLoadingFilter,
                value: filtered,
                name: "sort",
                onChange: onFilterChange,
            }}
            button={{
                className: "mt-1 sm:min-w-[200px] w-full",
            }}
            labelChildren={"Filter by assignee"}
            buttonChildren={filtered.value}
        />
    );

    const onShowAddTaskFormClick = () => {
        setShowAddTaskForm();
    };

    const renderEmployeeTask = (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {taskData.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    assignEmptyTaskTo={assignEmptyTaskToName}
                    assignEmptyTaskToEmployeeId={employee.id}
                />
            ))}
        </div>
    );

    const renderTaskForm = (
        <FormTransition show={showAddTaskForm}>
            <div className="z-10">
                <TaskForm employeeId={employee.id} />
            </div>
        </FormTransition>
    );

    const renderShowAddTaskFormBtnText = showAddTaskForm
        ? "Cancel"
        : "Add Task";

    // TODO:
    // [ ] - add chart for employee tasks
    return (
        <main className="flex flex-col gap-8">
            <Employee showTasksBtn={false} employee={employee} />
            <Button
                onClick={onShowAddTaskFormClick}
                className="w-full sm:w-min whitespace-nowrap self-end"
            >
                {renderShowAddTaskFormBtnText}
            </Button>
            {renderTaskForm}
            <FilterLayout
                titleForFilterBy="progress"
                filterBy={filterTaskBy}
                title="Tasks"
                heading={`${profileOwnerName} Tasks`}
                children={renderEmployeeTask}
                sortBy={sortTaskBy}
                paginationData={paginationData}
                restFilter={renderAssigneeFilter}
            />
        </main>
    );
};

export default EmployeeTaskPage;
