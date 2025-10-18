<?php

namespace Tests\Feature\Employee;

use App\Enums\Role;
use App\Models\Employee;
use App\Services\Employee\EmployeeQueryParamsValidation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class FilterEmployeeTest extends TestCase
{
    use Authenticated, RefreshDatabase, WithFaker;

    /**
     * @dataProvider provideEmployeeFilterData
     */
    public function test_employee_filter(string $queryKey, string $queryValue, string $employeeName, int $employeeCount): void
    {
        $secondEmployeeName = 'bbbb';

        Employee::factory()->createOne(['name' => $secondEmployeeName, 'role' => Role::EMPLOYEE->value]);
        $employee = Employee::factory()->createOne(['name' => $employeeName, 'role' => Role::ADMIN->value]);

        $this->actingAs($employee);

        $query = http_build_query([config($queryKey) => $queryValue]);

        $response = $this->get(route('employees.index').'?'.$query);

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeesPage/index')
                ->has('employees.data', $employeeCount, fn (Assert $page) => $page
                    ->where('name', $employeeName)->etc())
        )->assertOk();
    }

    public static function provideEmployeeFilterData()
    {
        return [
            'Search by employee name' => ['const.query_string.query_key', 'aaaa', 'aaaa', 1],
            'Sort employees by name' => ['const.query_string.sort_key', 'name', 'aaaa', 2],
            'Sort employees in descending order' => ['const.query_string.order_key', 'desc', 'cccc', 2],
            'Filter employees by role (admin)' => ['const.query_string.filter_key', Role::ADMIN->value, 'aaaa', 1],
        ];
    }

    public function test_search_filter_and_sort_employees_descending_order(): void
    {
        $firstEmployeeName = 'aaaa';
        $secondEmployeeName = $firstEmployeeName.'aaaa';

        $role = Role::EMPLOYEE->value;

        $employee = Employee::factory()->createOne(['name' => $firstEmployeeName, 'role' => $role]);

        Employee::factory()->createOne(['name' => 'bbbb', 'role' => Role::MANAGER->value]);
        Employee::factory()->createOne(['name' => 'cccc', 'role' => Role::ADMIN->value]);
        Employee::factory()->createOne(['name' => 'dddd', 'role' => Role::MANAGER->value]);
        Employee::factory()->createOne(['name' => $secondEmployeeName, 'role' => $role]);

        $this->actingAs($employee);

        $sortValue = EmployeeQueryParamsValidation::DEFAULT_SORT;
        $sortOrder = EmployeeQueryParamsValidation::DEFAULT_SORT_ORDER;

        $query = http_build_query([
            config('const.query_string.filter_key') => $role,
            config('const.query_string.query_key') => $firstEmployeeName,
            config('const.query_string.sort_key') => $sortValue,
            config('const.query_string.order_key') => $sortOrder,
        ]);

        $response = $this->get(route('employees.index').'?'.$query);

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeesPage/index')
                ->has(
                    'employees.data',
                    2,
                    fn (Assert $page) => $page->where('name', $firstEmployeeName)->where('role', $role)->etc()
                )->has('employees.data.1', fn (Assert $page) => $page->where('name', $secondEmployeeName)->where('role', $role)->etc())
        )->assertOk();
    }
}
