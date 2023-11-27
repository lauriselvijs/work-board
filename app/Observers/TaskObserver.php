<?php

namespace App\Observers;

use App\Models\Task;
use Illuminate\Support\Str;

class TaskObserver
{
    /**
     * Handle the Task "creating" event.
     */
    public function creating(Task $task): void
    {
        $task->assigned_by = auth()->id();
        $task->task_id = Str::uuid();
    }
}
