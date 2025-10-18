<?php

namespace App\Services\Dashboard;

use Illuminate\Support\Collection;

class DashboardFillData
{
    public function __construct(private DashboardQuery $dashboardQuery) {}

    public function withIntervalValuesForModelAttribute(Collection $interval, Collection $data, $modelAttribute)
    {
        $filledData = $interval->map(function ($period, $key) use ($data, $modelAttribute) {

            $existingData = $data->first(function ($item) use ($key) {
                return $item->period === $key;
            });

            if ($existingData) {
                if ($modelAttribute === $this->dashboardQuery::AGGREGATE) {
                    return [
                        $period => (int) $existingData->total,
                    ];
                }

                return [
                    $period => (int) $existingData->$modelAttribute,
                ];
            }

            return [
                $period => 0,
            ];
        })->mapWithKeys(function ($item) {
            return $item;
        });

        return $filledData;
    }
}
