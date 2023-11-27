<?php

namespace App\Services\Task;

use App\Models\Employee;
use App\Models\Task;
use App\Notifications\TaskAdded;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskService
{
    public function __construct(
        private Employee $employee,
        private TaskQueryParamsValidation $taskQueryParamsValidation,
        private TaskQuery $taskQuery,
        private TaskDataModification $taskDataModification,
        private TaskPagination $taskPagination
    ) {
    }

    public function filter(Employee $employee, array $queryParams = [], ...$rest): LengthAwarePaginator
    {
        $validatedParams = $this->taskQueryParamsValidation->validate([...$queryParams, $this->taskQueryParamsValidation::ASSIGNEES_FILTER_KEY => $rest[0]]);
        $tasksQuery = $this->taskQuery->build($employee, $validatedParams);
        $tasks = $this->taskPagination->paginate($tasksQuery);

        $this->taskDataModification->modify($tasks);

        return $tasks;
    }

    public function notifyAboutNewTask(Task $task): void
    {
        $employee = $this->employee::find($task->assigned_to);

        $employee->notify(new TaskAdded($task));
    }
}
