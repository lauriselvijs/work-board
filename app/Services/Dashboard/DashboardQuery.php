<?php

namespace App\Services\Dashboard;

use Illuminate\Contracts\Database\Eloquent\Builder;

class DashboardQuery
{
    public final const AGGREGATE = 'total';

    public function __construct(
        private DashboardValidator $DashboardValidator,
        private DashboardChartPeriod $dashboardChartPeriod
    ) {}

    /**
     * Get model data
     *
     * @param  array<string, string>  $period
     */
    public function data(string $model, array $period): array
    {
        [$attribute, $attributeValues] = $this->DashboardValidator->validatedModel($model);

        $interval = $this->dashboardChartPeriod->employee($period);

        $query = $this->period($model, $period);
        $query = $this->modelAttributes([$attribute, $attributeValues], $query);

        $query->selectRaw('COUNT(*) AS '.self::AGGREGATE);

        $this->periodFilters($query, $period);

        $result = $query->groupBy('period')
            ->orderBy('period')
            ->get();

        return [$result, $attributeValues, $interval];
    }

    private function period(string $model, array $period): Builder
    {
        end($period);

        switch (key($period)) {
            case 'year':
                return $model::selectRaw('MONTH(created_at) AS period');
            default:
                return $model::selectRaw('YEAR(created_at) AS period');
        }
    }

    private function modelAttributes(array $validatedAttribute, Builder $query): Builder
    {
        [$attribute, $attributeValues] = $validatedAttribute;

        foreach ($attributeValues as $attributeValue) {
            $query->selectRaw("SUM(CASE WHEN $attribute = ? THEN 1 ELSE 0 END) AS $attributeValue", [$attributeValue]);
        }

        return $query;
    }

    private function periodFilters(Builder $query, $period): void
    {
        foreach ($period as $key => $value) {
            switch ($key) {
                case 'year':
                    $query->whereYear('created_at', $value);
                    break;
                default:
                    break;
            }
        }
    }
}
