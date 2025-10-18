<?php

namespace App\Services\Dashboard;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class DashboardDataTransformer
{
    public function __construct(
        private DashboardFillData $dashboardFillData,
        private DashboardQuery $dashboardQuery,
    ) {}

    public function transformYears(Collection $years): Collection
    {
        return $years->map(function ($year) {
            return ['value' => ['id' => $year, 'value' => $year]];
        });
    }

    public function transform(string $model, array $period): array
    {
        [$data, $attributeValues, $interval] = $this->dashboardQuery->data($model, $period);

        foreach ([...$attributeValues, $this->dashboardQuery::AGGREGATE] as $attributeValue) {
            $attributeLabel = Str::headline($attributeValue);

            $dataset = [
                'label' => $attributeLabel,
                'data' => $this->dashboardFillData->withIntervalValuesForModelAttribute($interval, $data, $attributeValue),
            ];

            $result['datasets'][] = $dataset;

            if ($attributeValue !== $this->dashboardQuery::AGGREGATE) {
                $result['period_total'][$attributeLabel] = collect($dataset['data'])->sum();
            }
        }

        return $result;
    }
}
