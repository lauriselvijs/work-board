<?php

namespace Tests\Feature\Employee;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class CreateEmployeeTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    public function employeeFakeWithPassword(): array
    {
        $employeeData = Employee::factory()->makeOne()->toArray();
        $employeeData['password'] = 'password123';
        $employeeData['password_confirmation'] = 'password123';

        return $employeeData;
    }

    public function testCreateEmployee(): void
    {
        $employeeData = $this->employeeFakeWithPassword();

        Hash::shouldReceive('make')
            ->with($employeeData['password'])
            ->andReturn($employeeData['password']);

        $response = $this->post(route('employees.store'), $employeeData);

        $response->assertStatus(Response::HTTP_FOUND)
            ->assertRedirect(route('dashboard'))
            ->assertSessionHas('message', __('Profile created'));

        $this->assertAuthenticated();

        $response = $this->get(route('employees.index'));

        $response->assertInertia(
            fn (Assert $page) => $page->component('EmployeesPage/index')
                ->has('employees.data', 1, fn (Assert $page) => $page
                    ->where('name', $employeeData['name'])
                    ->where('email', $employeeData['email'])
                    ->where('phone_number', $employeeData['phone_number'])
                    ->where('role', $employeeData['role'])
                    ->where('phone_number_country', $employeeData['phone_number_country'])
                    ->has('email_notification')
                    ->has('push_notification')
                    ->etc())
        )->assertOk();

        $employee = Employee::where('email', $employeeData['email'])->first();

        $this->assertSame($employeeData['password'], $employee->password);
    }

    public function testValidatesEmployeeRegistrationFormWithPrecognition()
    {
        $employeeData = $this->employeeFakeWithPassword();

        $response = $this->withPrecognition()
            ->post(route('employees.store'), $employeeData);

        $response->assertSuccessfulPrecognition();
        $this->assertSame(0, Employee::count());
    }
}
