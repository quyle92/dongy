<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Traits\HasSlug;

class Category extends Model
{
    use HasFactory, HasSlug;

    protected $guarded = [];

    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn(string $value) => Str::title($value),
        );
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
