<?php

namespace Database\Factories;

use App\Enums\TaskStatus;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph,
            'assigned_by' => Employee::factory(),
            'assigned_to' => Employee::factory(),
            'task_id' => $this->faker->uuid,
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(array_column(TaskStatus::cases(), 'value')),
            'created_at' => function (array $attributes) {
                return Employee::find($attributes['assigned_by'])->created_at;
            },
        ];
    }
}
