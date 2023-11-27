<?php

namespace App\Services\Dashboard;

use App\Models\Employee;
use App\Services\Helper;
use Illuminate\Support\Collection;

class DashboardChartPeriod
{
    public function employee(array $period): Collection
    {
        end($period);

        switch (key($period)) {
            case 'year':
                return Helper::getMonthNames();
            default:
                return $this->getEmployeeYears();
        }
    }

    private function getEmployeeYears(): Collection
    {
        return Employee::getEmployeeYears()->mapWithKeys(function ($item) {
            return [$item => $item];
        });
    }
}
