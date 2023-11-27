<?php

namespace App\Policies;

use App\Models\Employee;

class EmployeePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Employee $authEmployee): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Employee $authEmployee, Employee $employee): bool
    {
        return $authEmployee->id === $employee->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Employee $authEmployee): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Employee $authEmployee, Employee $employee): bool
    {
        return $authEmployee->id === $employee->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Employee $authEmployee, Employee $employee): bool
    {
        return $authEmployee->id === $employee->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Employee $authEmployee, Employee $employee): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Employee $authEmployee, Employee $employee): bool
    {
        return false;
    }
}
