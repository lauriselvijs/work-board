<?php

namespace App\Http\Requests;

use App\Enums\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class StoreEmployeeRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:employees,email',
            'phone_number' => 'required|string|phone:INTERNATIONAL|unique:employees,phone_number',
            'phone_number_country' => 'required_with:phone_number',
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => ['required', 'string',  new Enum(Role::class)],
        ];
    }
}
