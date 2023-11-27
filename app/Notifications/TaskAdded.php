<?php

namespace App\Notifications;

use App\Enums\JobTag;
use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use Throwable;

class TaskAdded extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private Task $task)
    {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'broadcast'];
    }

    /**
     * Determine which queues should be used for each notification channel.
     *
     * @return array<string, string>
     */
    public function viaQueues(): array
    {
        return [
            'mail' => 'emails',
            'broadcast' => 'broadcasts',
        ];
    }

    /**
     * Get the type of the notification being broadcast.
     */
    public function broadcastType(): string
    {
        return 'broadcast.message.taskAdded';
    }

    /**
     * Get the tags that should be assigned to the job.
     *
     * @return array<int, string>
     */
    public function tags(): array
    {
        return [JobTag::NOTIFICATION->value, 'task:'.$this->task->task_id];
    }

    /**
     * Handle a job failure.
     */
    public function failed(Throwable $exception): void
    {
        Log::channel('failed_notifications')->emergency($exception->getMessage());
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $assignee = $this->toArray($notifiable)['assigned_by_name'];

        return (new MailMessage)
            ->subject('Tasks')
            ->line("New task {$this->task->title} added by {$assignee}")
            ->action('View your tasks', route('employee.tasks', $notifiable));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'task_id' => $this->task->task_id,
            'title' => $this->task->title,
            'assigned_by_name' => $this->task->assignedByEmployee->name,
            'assigned_by_username' => $this->task->assignedByEmployee->username,
        ];
    }
}
