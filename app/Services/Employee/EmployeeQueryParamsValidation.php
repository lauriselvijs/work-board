<?php

namespace App\Services\Employee;

use App\Enums\Role;

class EmployeeQueryParamsValidation
{
    public final const DEFAULT_SORT = 'name';

    public final const DEFAULT_SORT_ORDER = 'asc';

    public final const DEFAULT_FILTER_PARAM = 'all';

    private const SORT_BY = ['name', 'created_at', 'updated_at'];

    private const SORT_ORDER_BY = ['asc', 'desc'];

    public function validate(array $queryParams): array
    {
        $roles = array_column(Role::cases(), 'value');

        return [
            config('const.query_string.query_key') => $queryParams[config('const.query_string.query_key')] ?? '',
            config('const.query_string.sort_key') => in_array(
                $queryParams[config('const.query_string.sort_key')],
                self::SORT_BY
            ) ? $queryParams[config('const.query_string.sort_key')] : self::DEFAULT_SORT,
            config('const.query_string.order_key') => in_array(
                $queryParams[config('const.query_string.order_key')],
                self::SORT_ORDER_BY
            ) ? $queryParams[config('const.query_string.order_key')] : self::DEFAULT_SORT_ORDER,
            config('const.query_string.filter_key') => in_array(
                $queryParams[config('const.query_string.filter_key')],
                $roles
            )
                ? $queryParams[config('const.query_string.filter_key')] : self::DEFAULT_FILTER_PARAM,
        ];
    }
}
