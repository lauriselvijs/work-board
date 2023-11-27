<?php

namespace App\Http\Requests;

use App\Enums\Role;
use App\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->employee);
    }

    // TODO:
    // [ ] - Add separate password reset request with old password confirmation
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'phone_number' => ['sometimes', 'required', 'string', 'phone:INTERNATIONAL', Rule::unique(Employee::class)->ignore($this->user()->id)],
            'phone_number_country' => 'required_with:phone_number',
            'email' => ['sometimes', 'required', 'string', 'email', Rule::unique(Employee::class)->ignore($this->user()->id)],
            'role' => ['sometimes', 'required', 'string',  new Enum(Role::class)],
        ];
    }
}
