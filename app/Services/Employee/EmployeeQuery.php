<?php

namespace App\Services\Employee;

use App\Models\Employee;
use Laravel\Scout\Builder as ScoutBuilder;

class EmployeeQuery
{
    public function __construct(
        private Employee $employee,
        private EmployeeQueryParamsValidation $employeeQueryParamsValidation
    ) {
    }

    public function build(array $validatedParams): ScoutBuilder
    {
        $employeesQuery = $this->employee::search($validatedParams['query']);

        if ($validatedParams['filter'] !== $this->employeeQueryParamsValidation::DEFAULT_FILTER_PARAM) {
            $employeesQuery->where('role', $validatedParams['filter']);
        }

        return $employeesQuery->orderBy($validatedParams['sort'], $validatedParams['order']);
    }
}
