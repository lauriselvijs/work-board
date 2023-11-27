<?php

namespace Database\Factories;

use App\Enums\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Create default.
     */
    public function default(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'email' => 'example@example.com',
            ];
        });
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone_number' => $this->faker->unique()->e164PhoneNumber(),
            'phone_number_country' => 'US',
            'username' => $this->faker->uuid,
            'password' => Hash::make('password'),
            'role' => $this->faker->randomElement(array_column(Role::cases(), 'value')),
            'created_at' => $this->faker->dateTimeBetween('-5 years'),
        ];
    }
}
