<?php

namespace App\Services\Employee;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Laravel\Scout\Builder as ScoutBuilder;

class EmployeePagination
{
    private const EMPLOYEES_PER_PAGE = 15;

    public function paginate(ScoutBuilder $employeesQuery): LengthAwarePaginator
    {
        return $employeesQuery->paginate(self::EMPLOYEES_PER_PAGE)->withQueryString();
    }
}
