<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\PostStatus;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(3, true);
        return [
            "title" => $title,
            "slug" => Str::slug($title),
            "category_id" => 1,
            "content" => $this->faker->paragraphs(1, true),
            "status" => PostStatus::PUBLISHED
        ];
    }
}
