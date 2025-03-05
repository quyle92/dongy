<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'unique:posts', 'max:255'],
            'content' => ['required'],
            'category_id' => ['required', 'exists:' . Category::table() . ",id"],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Category is required',
            'title.unique' => 'Title is duplicate',
        ];
    }
}
