<?php

namespace App\Services\Task;

use App\Services\Employee\EmployeeService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class TaskDataModification
{
    private const CURRENT_EMPLOYEE_PRONOUN = 'You';

    public function __construct(private Auth $auth, private EmployeeService $employeeService) {}

    public function modify(LengthAwarePaginator $tasks): void
    {
        $tasks->each(function ($task) {
            $task->assigned_by = $task->assignedByEmployee->id === $this->auth::id() ? $task->assignedByEmployee->fill(['name' => __(self::CURRENT_EMPLOYEE_PRONOUN)]) : $task->assigned_by;

            if (isset($task->assigned_to)) {
                $task->assigned_to = $task->assignedToEmployee->id === $this->auth::id() ? $task->assignedToEmployee->fill(['name' => __(self::CURRENT_EMPLOYEE_PRONOUN)]) : $task->assigned_to;
            }
        });
    }
}
