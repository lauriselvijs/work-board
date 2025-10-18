<?php

namespace Tests\Feature\Employee;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class ViewEmployeeTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    public function test_view_employee(): void
    {
        $employee = $this->authenticateAsEmployee();

        $response = $this->get(route('employee.tasks', $employee));

        $response->assertInertia(
            fn (Assert $page) => $page->component('EmployeeTaskPage/index')->has('employee', 11)
        )->assertOk();
    }

    public function test_view_employee_tasks_as_guest_gets_redirected_to_login_page(): void
    {
        $employee = Employee::factory()->createOne();

        $response = $this->get(route('employee.tasks', $employee));

        $response->assertRedirect(route('employee.login'));
    }
}
