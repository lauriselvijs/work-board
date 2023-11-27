<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->task);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string:max:255',
            'assigned_to' => 'sometimes|nullable|exists:employees,id', // Ensure the assigned_to exists in the employees table
            'due_date' => 'sometimes|nullable|after:now',
            'status' => ['sometimes', 'required', 'string', new Enum(TaskStatus::class)], // Validate that the status is one of the allowed values
        ];
    }
}
