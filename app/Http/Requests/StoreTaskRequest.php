<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'assigned_to' => 'nullable|exists:employees,id', // Ensure the assigned_to exists in the employees table
            'due_date' => 'required|date|after:now',
            'status' => ['required', 'string', new Enum(TaskStatus::class)], // Validate that the status is one of the allowed values
        ];
    }
}
