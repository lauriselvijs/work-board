<?php

namespace Tests\Traits;

use App\Models\Employee;

trait Authenticated
{
    private function authenticateAsEmployee($guard = null): Employee
    {
        $employee = Employee::factory()->create();
        $this->actingAs($employee, $guard);

        return $employee;
    }
}
