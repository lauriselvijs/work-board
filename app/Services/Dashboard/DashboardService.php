<?php

namespace App\Services\Dashboard;

class DashboardService
{
    public final const QUERY_YEAR_KEY = 'year';

    public function __construct(private DashboardChartData $dashboardChartData) {}

    public function getData(string|array|null $year)
    {
        $chartData = $this->dashboardChartData->get($year);
        $totalData = $this->dashboardChartData->getTotal();

        return [$chartData, $totalData];
    }
}
