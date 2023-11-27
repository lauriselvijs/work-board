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

    public function testViewEmployee(): void
    {
        $employee = $this->authenticateAsEmployee();

        $response = $this->get(route('employee.tasks', $employee));

        $response->assertInertia(
            fn (Assert $page) => $page->component('EmployeeTaskPage/index')->has('employee', 11)
        )->assertOk();
    }

    public function testViewEmployeeTasksAsGuestGetsRedirectedToLoginPage(): void
    {
        $employee = Employee::factory()->createOne();

        $response = $this->get(route('employee.tasks', $employee));

        $response->assertRedirect(route('employee.login'));
    }
}
