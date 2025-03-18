<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Post;
use App\Models\Category;
use App\Enums\PostStatus;

class UpsertPostRequest extends FormRequest
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
        $id = request()->post?->id;

        return [
            'title' => ['required',  'max:255', $id ? Rule::unique(Post::table())->ignore($id) : 'unique:' . Post::table()],
            'content' => ['required'],
            'category_id' => ['required', 'exists:' . Category::table() . ",id"],
            "status" => ["required", Rule::in(PostStatus::values())],
            "source" => ["required", 'max:255'],
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
