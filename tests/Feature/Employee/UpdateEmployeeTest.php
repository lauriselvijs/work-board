<?php

namespace Tests\Feature\Employee;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class UpdateEmployeeTest extends TestCase
{
    use Authenticated, RefreshDatabase, WithFaker;

    public function test_update_employee(): void
    {
        $employee = $this->authenticateAsEmployee();

        $employeeData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'role' => 'manager',
            'phone_number' => $this->faker->e164PhoneNumber,
            'phone_number_country' => 'US',
        ];

        $response = $this->put(route('employees.update', $employee), $employeeData);

        $response
            ->assertFound()
            ->assertSessionHas('message', __('Profile updated'));

        $response = $this->get(route('employees.show', $employee));

        $response->assertInertia(
            fn (Assert $page) => $page->component('EmployeeShowPage/index')
                ->has('employee', 11)
                ->where('employee.name', $employeeData['name'])
                ->where('employee.email', $employeeData['email'])
                ->where('employee.phone_number', $employeeData['phone_number'])
                ->where('employee.role', $employeeData['role'])
                ->etc()
        )->assertOk();
    }

    public function test_forbid_employee_update_another_employee(): void
    {
        $this->authenticateAsEmployee();
        $employee2 = Employee::factory()->createOne();

        $employeeData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'role' => 'manager',
        ];

        $response = $this->put(route('employees.update', $employee2), $employeeData);

        $response->assertForbidden();
    }

    public function test_update_employee_as_guest_gets_redirected_to_login_page(): void
    {
        $employee = Employee::factory()->createOne();
        $newEmployeeData = Employee::factory()->make()->toArray();

        $response = $this->put(route('employees.update', $employee), $newEmployeeData);

        $response->assertRedirect(route('employee.login'));
    }
}
