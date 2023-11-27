<?php

namespace App\Policies;

use App\Models\Employee;
use App\Models\Task;

class TaskPolicy
{
    /**
     * Determine whether the employee can view any models.
     */
    public function viewAny(Employee $employee): bool
    {
        return true;
    }

    /**
     * Determine whether the employee can view the model.
     */
    public function view(Employee $employee, Task $task): bool
    {
        return true;
    }

    /**
     * Determine whether the employee can create models.
     */
    public function store(Employee $employee, Task $task): bool
    {
        return true;
    }

    /**
     * Determine whether the employee can update the model.
     */
    public function update(Employee $employee, Task $task): bool
    {
        return $employee->tasks()->where('id', $task->id)->exists();
    }

    /**
     * Determine whether the employee can delete the model.
     */
    public function delete(Employee $employee, Task $task): bool
    {
        return $task->assignedByEmployee()->where('id', $employee->id)->exists();
    }

    /**
     * Determine whether the employee can restore the model.
     */
    public function restore(Employee $employee, Task $task): bool
    {
        return false;
    }

    /**
     * Determine whether the employee can permanently delete the model.
     */
    public function forceDelete(Employee $employee, Task $task): bool
    {
        return false;
    }
}
