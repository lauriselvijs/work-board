<?php

namespace App\Services\Task;

use App\Models\Employee;
use App\Models\Task;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class TaskQuery
{
    public function __construct(
        private Task $task,
        private TaskQueryParamsValidation $taskQueryParamsValidation,
        private Auth $auth
    ) {}

    public function build(Employee $employee, array $validatedParams): Builder
    {
        $tasksQuery = $this->task::query();

        $this->applyAssigneesFilter($tasksQuery, $employee, $validatedParams['assignees_filter']);
        $this->search($tasksQuery, $validatedParams['query']);
        $this->filter($tasksQuery, $validatedParams['filter']);

        return $tasksQuery->orderBy($validatedParams['sort'], $validatedParams['order']);
    }

    private function filter(Builder $tasksQuery, string $filter): void
    {
        if ($filter !== $this->taskQueryParamsValidation::DEFAULT_FILTER_PARAM) {
            $tasksQuery->where('status', $filter);
        }
    }

    private function search(Builder $tasksQuery, string $searchQuery): void
    {
        $tasksQuery->where(function (Builder $query) use ($searchQuery) {
            $query->whereRelation('assignedByEmployee', 'name', 'like', '%'.$searchQuery.'%')
                ->orWhere('title', 'like', '%'.$searchQuery.'%');
        });
    }

    private function applyAssigneesFilter(Builder $tasksQuery, Employee $employee, string $assigneesFilter): void
    {
        $filterAssignees = [
            $this->taskQueryParamsValidation::BY_ASSIGNEE => fn (Builder $query) => $query->where('assigned_by', $employee->id),
            $this->taskQueryParamsValidation::TO_ASSIGNEE => fn (Builder $query) => $query->where('assigned_to', $employee->id),
            $this->taskQueryParamsValidation::UNSIGNED_TASKS => fn (Builder $query) => $query->where('assigned_to', null)->where('assigned_by', $this->auth::id()),
            $this->taskQueryParamsValidation::BY_ASSIGNEE_AND_TO_ASSIGNEE => fn (Builder $query) => $query->where(function (Builder $subQuery) use ($employee) {
                $subQuery->where('assigned_to', $employee->id)->orWhere('assigned_by', $employee->id);
            }),
        ];

        $filterCallback = $filterAssignees[$assigneesFilter] ?? null;

        if ($filterCallback !== null) {
            $filterCallback($tasksQuery);
        }
    }
}
