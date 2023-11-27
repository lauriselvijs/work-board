<?php

namespace App\Services\Task;

use App\Enums\TaskStatus;

class TaskQueryParamsValidation
{
    public const ASSIGNEES_FILTER_KEY = 'assignees_filter';

    public const DEFAULT_SORT = 'title';

    public const DEFAULT_FILTER_PARAM = 'all';

    public const DEFAULT_SORT_ORDER = 'asc';

    public const BY_ASSIGNEE = 'by_employee';

    public const TO_ASSIGNEE = 'to_employee';

    public const BY_ASSIGNEE_AND_TO_ASSIGNEE = 'by_employee_and_to_employee';

    public const UNSIGNED_TASKS = 'unsigned_tasks';

    private const SORT_BY = ['title', 'created_at', 'updated_at', 'due_date'];

    private const SORT_ORDER_BY = ['asc', 'desc'];

    private const ASSIGNEES_FILTER_BY = [self::BY_ASSIGNEE, self::TO_ASSIGNEE, self::BY_ASSIGNEE_AND_TO_ASSIGNEE, self::UNSIGNED_TASKS];

    public function validate(array $queryParams): array
    {
        $taskStatuses = array_column(TaskStatus::cases(), 'value');

        $validatedParams = [
            self::ASSIGNEES_FILTER_KEY => in_array($queryParams[self::ASSIGNEES_FILTER_KEY], self::ASSIGNEES_FILTER_BY) ? $queryParams[self::ASSIGNEES_FILTER_KEY] : self::DEFAULT_FILTER_PARAM,
            config('const.query_string.query_key') => $queryParams[config('const.query_string.query_key')] ?? '',
            config('const.query_string.sort_key') => in_array($queryParams[config('const.query_string.sort_key')], self::SORT_BY) ? $queryParams[config('const.query_string.sort_key')] : self::DEFAULT_SORT,
            config('const.query_string.order_key') => in_array($queryParams[config('const.query_string.order_key')], self::SORT_ORDER_BY) ? $queryParams[config('const.query_string.order_key')] : self::DEFAULT_SORT_ORDER,
            config('const.query_string.filter_key') => in_array($queryParams[config('const.query_string.filter_key')], $taskStatuses) ? $queryParams[config('const.query_string.filter_key')] : self::DEFAULT_FILTER_PARAM,
        ];

        return $validatedParams;
    }
}
