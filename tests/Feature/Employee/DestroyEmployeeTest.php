<?php

namespace Tests\Feature\Employee;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class DestroyEmployeeTest extends TestCase
{
    use Authenticated, RefreshDatabase, WithFaker;

    public function test_show_password_on_destroy_employee(): void
    {
        $employee = $this->authenticateAsEmployee();

        $response = $this->delete(route('employees.destroy', $employee));

        $response->assertRedirect(route('password.confirm'));
    }

    public function test_destroy_employee_as_guest_gets_redirected_to_login_page(): void
    {
        $employee = Employee::factory()->createOne();

        $response = $this->delete(route('employees.destroy', $employee));

        $response->assertRedirect(route('employee.login'));
    }
}
