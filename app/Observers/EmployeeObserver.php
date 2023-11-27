<?php

namespace App\Observers;

use App\Models\Employee;
use Illuminate\Support\Str;

class EmployeeObserver
{
    /**
     * Handle the Employee "creating" event.
     */
    public function creating(Employee $employee): void
    {
        $employee->username = Str::uuid();
    }
}
