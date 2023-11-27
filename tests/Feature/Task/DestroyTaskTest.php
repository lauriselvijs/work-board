<?php

namespace Tests\Feature\Task;

use App\Models\Employee;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class DestroyTaskTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    private Employee $employee;

    public function setUp(): void
    {
        parent::setUp();

        $this->employee = $this->authenticateAsEmployee();
    }

    public function testForbidToDestroyTaskIfNotOwnedByEmployee(): void
    {
        $task = Task::factory()->createOne();

        $this->authenticateAsEmployee();

        $response = $this->delete(route('tasks.destroy', $task));

        $response
            ->assertForbidden();
    }

    public function testForbidToDestroyTaskIfGuestAndRedirectToLoginPage(): void
    {
        $task = Task::factory()->createOne();
        $this->actingAsGuest();

        $response = $this->delete(route('tasks.destroy', $task));

        $response->assertRedirect(route('employee.login'));
    }

    public function testDestroyTask()
    {
        $task = Task::factory()->createOne();

        $response = $this->delete(route('tasks.destroy', $task));

        $response
            ->assertFound()
            ->assertSessionHas('message', __('Task deleted'));

        $response = $this->get(route('employee.tasks', $this->employee->username));

        $response->assertInertia(
            fn (Assert $page) => $page->component('EmployeeTaskPage/index')->has('tasks.data', 0)
        )->assertOk();
    }
}
