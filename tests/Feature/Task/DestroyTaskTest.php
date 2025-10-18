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

    protected function setUp(): void
    {
        parent::setUp();

        $this->employee = $this->authenticateAsEmployee();
    }

    public function test_forbid_to_destroy_task_if_not_owned_by_employee(): void
    {
        $task = Task::factory()->createOne();

        $this->authenticateAsEmployee();

        $response = $this->delete(route('tasks.destroy', $task));

        $response
            ->assertForbidden();
    }

    public function test_forbid_to_destroy_task_if_guest_and_redirect_to_login_page(): void
    {
        $task = Task::factory()->createOne();
        $this->actingAsGuest();

        $response = $this->delete(route('tasks.destroy', $task));

        $response->assertRedirect(route('employee.login'));
    }

    public function test_destroy_task()
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
