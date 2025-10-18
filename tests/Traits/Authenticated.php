<?php

namespace Tests\Traits;

use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

trait Authenticated
{
    private function authenticateAsEmployee($guard = null): Employee
    {
        $employee = Employee::factory()->create();
        $this->actingAs($employee, $guard);

        return $employee;
    }

    public function actingAsGuest($guard = null): static
    {
        return parent::actingAsGuest($guard);
    }
}
