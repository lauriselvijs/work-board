<?php

namespace App\Services\Employee;

use App\Models\Employee;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ValidatedInput;

class EmployeeService
{
    public function __construct(
        private Employee $employee,
        private Hash $hash,
        private Auth $auth,
        private EmployeeQueryParamsValidation $employeeQueryParamsValidation,
        private EmployeeQuery $employeeQuery,
        private EmployeePagination $employeePagination
    ) {
    }

    public function filter(array $queryParams = []): LengthAwarePaginator
    {
        $validatedParams = $this->employeeQueryParamsValidation->validate($queryParams);
        $employeesQuery = $this->employeeQuery->build($validatedParams);
        $employees = $this->employeePagination->paginate($employeesQuery);

        return $employees;
    }

    public function store(ValidatedInput $employee): void
    {
        $employee->password = $this->hash::make($employee->password);

        $employee = $this->employee::create($employee->toArray());

        auth()->login($employee);

        session()->regenerate();
    }

    public function update(ValidatedInput $updatedEmployee, Employee $employee): void
    {
        $employee->fill($updatedEmployee->toArray());

        $employee->save();
    }

    public function destroy(Employee $employee): void
    {
        auth()->logout();

        $employee->delete();

        session()->invalidate();
        session()->regenerateToken();
    }

    public function togglePushNotifications(): void
    {
        $authEmployee = $this->auth::user();

        $authEmployee->push_notification = ! $authEmployee->push_notification;
        $authEmployee->save();
    }

    public function toggleEmailNotifications(): void
    {
        $authEmployee = $this->auth::user();

        $authEmployee->email_notification = ! $authEmployee->email_notification;
        $authEmployee->save();
    }
}
