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

    public function setUp(): void
    {
        parent::setUp();

        $this->employee = $this->authenticateAsEmployee();
    }

    public function testShowEmployeeTasks(): void
    {
        $response = $this->get(route('employee.tasks', $this->employee));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeeTaskPage/index')
        )->assertOk();
    }
}
