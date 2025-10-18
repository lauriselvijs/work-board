<?php

namespace Tests\Feature\Task;

use App\Models\Employee;
use App\Models\Task;
use App\Notifications\TaskAdded;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class StoreTaskTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    private Employee $employee;

    protected function setUp(): void
    {
        parent::setUp();

        $this->employee = $this->authenticateAsEmployee();
    }

    public function test_store_task()
    {
        Notification::fake();

        $taskData = Task::factory()->makeOne()->toArray();
        $employee = Employee::find($taskData['assigned_to']);

        $response = $this->post(route('tasks.store'), $taskData);

        $response
            ->assertFound()
            ->assertSessionHas('message', __('Task created'));

        Notification::assertSentTo($employee, TaskAdded::class);

        $response = $this->get(route('employee.tasks', $this->employee->username));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeeTaskPage/index')
                ->has(
                    'tasks.data',
                    1,
                    fn (Assert $page) => $page
                        ->where('title', $taskData['title'])
                        ->where('description', $taskData['description'])
                        ->where('due_date', $taskData['due_date'])
                        ->where('status', $taskData['status'])
                        ->etc()
                )
        )->assertOk();
    }

    public function test_forbid_to_store_task_if_guest_and_redirect_to_login_page(): void
    {
        $newTaskData = Task::factory()->makeOne()->toArray();
        $this->actingAsGuest();

        $response = $this->post(route('tasks.store'), $newTaskData);

        $response->assertRedirect(route('employee.login'));
    }
}
