<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Services\Task\TaskService;
use Illuminate\Http\RedirectResponse;

class TaskController extends Controller
{
    public function __construct(private TaskService $taskService, private Task $task) {}

    /**
     * Store a newly created resource in storage.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $task = $request->safe();

        $task = $this->task::create($task->toArray());

        $this->taskService->notifyAboutNewTask($task);

        return redirect()->back()->with('message', __('Task created'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $taskData = $request->safe();

        $task->fill($taskData->toArray());

        $task->save();

        return redirect()->back()->with('message', __('Task updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return redirect()->back()->with('message', __('Task deleted'));
    }
}
