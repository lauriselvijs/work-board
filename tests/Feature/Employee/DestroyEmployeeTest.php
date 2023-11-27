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

    public function testShowPasswordOnDestroyEmployee(): void
    {
        $employee = $this->authenticateAsEmployee();

        $response = $this->delete(route('employees.destroy', $employee));

        $response->assertRedirect(route('password.confirm'));
    }

    public function testDestroyEmployeeAsGuestGetsRedirectedToLoginPage(): void
    {
        $employee = Employee::factory()->createOne();

        $response = $this->delete(route('employees.destroy', $employee));

        $response->assertRedirect(route('employee.login'));
    }
}
