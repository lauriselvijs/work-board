<?php

namespace App\Http\Controllers;

use App\Services\Dashboard\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private Inertia $inertia, private DashboardService $dashboardService)
    {
    }

    public function __invoke(Request $request)
    {
        $year = $request->query($this->dashboardService::QUERY_YEAR_KEY);

        [$chartData, $totalData] = $this->dashboardService->getData($year);

        return $this->inertia::render('DashboardPage/index', ['chartData' => $chartData, 'totalData' => $totalData]);
    }
}
