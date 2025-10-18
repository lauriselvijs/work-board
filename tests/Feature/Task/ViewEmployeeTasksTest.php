<?php

namespace Tests\Feature\Task;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class ViewEmployeeTasksTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    private Employee $employee;

    protected function setUp(): void
    {
        parent::setUp();

        $this->employee = $this->authenticateAsEmployee();
    }

    public function test_show_employee_tasks(): void
    {
        $response = $this->get(route('employee.tasks', $this->employee));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeeTaskPage/index')
        )->assertOk();
    }
}
