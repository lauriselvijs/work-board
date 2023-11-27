<?php

namespace Tests\Feature\Employee;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class ViewEmployeesTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    public function testViewEmployees(): void
    {
        $this->authenticateAsEmployee();

        Employee::factory()->count(5)->create();

        $response = $this->get(route('employees.index'));

        $response->assertInertia(
            fn (Assert $page) => $page->component('EmployeesPage/index')->has('employees.data', 6)
        )->assertOk();
    }

    public function testViewEmployeesAsGuestGetsRedirectedToLoginPage(): void
    {
        $response = $this->get(route('employees.index'));

        $response->assertRedirect(route('employee.login'));
    }
}
