<?php

namespace Tests\Feature\Task;

use App\Enums\TaskStatus;
use App\Models\Employee;
use App\Models\Task;
use App\Services\Task\TaskQueryParamsValidation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class FilterTaskTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    private Employee $employee;

    protected function setUp(): void
    {
        parent::setUp();

        // If your trait method doesn't have a return type, the property type keeps analyzers happy.
        $this->employee = $this->authenticateAsEmployee();
    }

    #[DataProvider('provideTaskFilterData')]
    public function test_task_filter(string $queryKey, string $queryValue, string $taskTitle, int $taskCount): void
    {
        $secondTaskTitle = 'bbbb';

        Task::factory()->createOne(['title' => $secondTaskTitle, 'status' => TaskStatus::DONE->value]);
        Task::factory()->createOne(['title' => $taskTitle, 'status' => TaskStatus::TODO->value]);

        $query = http_build_query([config($queryKey) => $queryValue]);

        $response = $this->get(route('employee.tasks', [$this->employee]).'?'.$query);

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeeTaskPage/index')
                ->has('tasks.data', $taskCount, fn (Assert $page) => $page
                    ->where('title', $taskTitle)->etc())
        )->assertOk();
    }

    public static function provideTaskFilterData(): array
    {
        return [
            'Search by task title' => ['const.query_string.query_key', 'aaaa', 'aaaa', 1],
            'Sort by task title' => ['const.query_string.sort_key', 'title', 'aaaa', 2],
            'Sort tasks in descending order' => ['const.query_string.order_key', 'desc', 'cccc', 2],
            'Filter tasks by status (todo)' => ['const.query_string.filter_key', TaskStatus::TODO->value, 'aaaa', 1],
            'Filter tasks by assignee (by employee)' => [TaskQueryParamsValidation::ASSIGNEES_FILTER_KEY, TaskQueryParamsValidation::BY_ASSIGNEE, 'aaaa', 2],
        ];
    }

    public function test_filter_unsigned_tasks(): void
    {
        Task::factory()->createOne(['assigned_to' => null]);

        $query = http_build_query([
            TaskQueryParamsValidation::ASSIGNEES_FILTER_KEY => TaskQueryParamsValidation::UNSIGNED_TASKS,
        ]);

        $response = $this->get(route('employee.tasks', [$this->employee]).'?'.$query);

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeeTaskPage/index')
                ->has('tasks.data', 1, fn (Assert $page) => $page
                    ->where('assigned_to', null)->etc())
        )->assertOk();
    }

    public function test_search_filter_and_sort_task_by_employee_in_descending_order(): void
    {
        $firstTaskTitle = 'aaaa';
        $secondTaskTitle = $firstTaskTitle.'aaaa';

        $status = TaskStatus::DONE->value;

        Task::factory()->createOne(['title' => $secondTaskTitle, 'status' => $status]);

        /** @var Employee $employee */
        $employee = $this->authenticateAsEmployee();

        Task::factory()->createOne(['title' => $firstTaskTitle, 'status' => $status]);

        Task::factory()->createOne(['title' => 'bbbb', 'status' => TaskStatus::IN_PROGRESS->value]);
        Task::factory()->createOne(['title' => 'cccc', 'status' => TaskStatus::TODO->value]);
        Task::factory()->createOne(['title' => $secondTaskTitle, 'status' => $status]);

        $sortValue = TaskQueryParamsValidation::DEFAULT_SORT;
        $sortOrder = TaskQueryParamsValidation::DEFAULT_SORT_ORDER;

        $query = http_build_query([
            config('const.query_string.filter_key') => $status,
            config('const.query_string.query_key') => $firstTaskTitle,
            config('const.query_string.sort_key') => $sortValue,
            config('const.query_string.order_key') => $sortOrder,
            TaskQueryParamsValidation::ASSIGNEES_FILTER_KEY => TaskQueryParamsValidation::BY_ASSIGNEE,
        ]);

        $response = $this->get(route('employee.tasks', [$employee]).'?'.$query);

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeeTaskPage/index')
                ->has(
                    'tasks.data',
                    2,
                    fn (Assert $page) => $page->where('title', $firstTaskTitle)->where('status', $status)->etc()
                )->has('tasks.data.1', fn (Assert $page) => $page->where('title', $secondTaskTitle)->where('status', $status)->etc())
        )->assertOk();
    }
}
