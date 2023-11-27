<?php

namespace App\Services\Task;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskPagination
{
    private const TASKS_PER_PAGE = 15;

    public function paginate(Builder $tasksQuery): LengthAwarePaginator
    {
        return $tasksQuery->paginate(self::TASKS_PER_PAGE)->withQueryString();
    }
}
