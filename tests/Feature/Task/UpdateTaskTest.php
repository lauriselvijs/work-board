<?php

namespace Tests\Feature\Task;

use App\Models\Employee;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;
use Tests\Traits\Authenticated;

class UpdateTaskTest extends TestCase
{
    use Authenticated, RefreshDatabase;

    private Employee $employee;

    public function setUp(): void
    {
        parent::setUp();

        $this->employee = $this->authenticateAsEmployee();
    }

    public function testUpdateTask()
    {
        $task = Task::factory()->createOne();

        $newTaskData = ['title' => 'updated title'];

        $response = $this->put(route('tasks.update', $task), $newTaskData);

        $response
            ->assertFound()
            ->assertSessionHas('message', __('Task updated'));

        $response = $this->get(route('employee.tasks', $this->employee->username));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('EmployeeTaskPage/index')
                ->has('tasks.data', 1, fn (Assert $page) => $page
                    ->where('title', $newTaskData['title'])
                    ->etc())
        )->assertOk();
    }

    public function testForbidToUpdateTaskIfNotOwnedByEmployee(): void
    {
        $task = Task::factory()->createOne();

        $this->authenticateAsEmployee();

        $newTaskData = ['title' => 'updated title'];

        $response = $this->put(route('tasks.update', $task), $newTaskData);

        $response
            ->assertForbidden();
    }

    public function testForbidToUpdateTaskIfGuestAndRedirectToLoginPage(): void
    {
        $task = Task::factory()->createOne();
        $newTaskData = Task::factory()->makeOne()->toArray();

        $this->actingAsGuest();

        $response = $this->put(route('tasks.update', $task), $newTaskData);

        $response->assertRedirect(route('employee.login'));
    }
}
