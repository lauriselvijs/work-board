<?php

namespace App\Services\Dashboard;

use App\Enums\Role;
use App\Enums\TaskStatus;
use App\Models\Employee;
use App\Models\Task;
use Illuminate\Support\Collection;
use InvalidArgumentException;

class DashboardValidator
{
    public final const MODEL_ATTRIBUTES = [
        Employee::class => ['attribute' => 'role', 'values' => Role::class],
        Task::class => ['attribute' => 'status', 'values' => TaskStatus::class],
    ];

    public function validatedYear(string|array|null $year, Collection $years): int
    {
        if (is_string($year) && $years->contains($year)) {
            return (int) $year;
        }

        return (int) $years->last();
    }

    /**
     * @throws InvalidArgumentException
     */
    public function validatedModel(string $model): array
    {
        if (! class_exists($model)) {
            throw new InvalidArgumentException('Invalid model class: '.$model);
        }

        if (! in_array($model, array_keys(self::MODEL_ATTRIBUTES))) {
            throw new InvalidArgumentException('Model class not allowed: '.$model);
        }

        $attribute = self::MODEL_ATTRIBUTES[$model]['attribute'];
        $attributeValues = array_column(self::MODEL_ATTRIBUTES[$model]['values']::cases(), 'value');

        return [$attribute, $attributeValues];
    }
}
