<?php

namespace App\Services\Dashboard;

use App\Models\Employee;
use App\Models\Task;

class DashboardChartData
{
    public function __construct(
        private DashboardValidator $dashboardValidator,
        private DashboardDataTransformer $dashboardDataTransformer
    ) {}

    public function get(string|array|null $year): array
    {
        $employeeYears = Employee::getEmployeeYears();
        $validatedYear = $this->dashboardValidator->validatedYear($year, $employeeYears);

        $data = [
            'data' => [
                'employees' => $this->dashboardDataTransformer->transform(Employee::class, ['year' => $validatedYear]),
                'tasks' => $this->dashboardDataTransformer->transform(Task::class, ['year' => $validatedYear]),
            ],
            'years' => $this->dashboardDataTransformer->transformYears($employeeYears),
            'year' => [
                'value' => $validatedYear,
                'id' => $validatedYear,
            ],
        ];

        return $data;
    }

    public function getTotal(): array
    {
        $total = [
            'data' => [
                'employees' => $this->dashboardDataTransformer->transform(Employee::class, []),
                'tasks' => $this->dashboardDataTransformer->transform(Task::class, []),
            ],
        ];

        return $total;
    }
}
