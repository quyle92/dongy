<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Traits\ModelHelpers;
use App\Models\Traits\HasSlug;
use App\Enums\PostStatus;

class Post extends Model
{
    use HasFactory, HasSlug, ModelHelpers;

    protected $guarded = [];
    protected $perPage = 10;
    protected $appends = ['permalink'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected function casts(): array
    {
        return [
            'status' => PostStatus::class,
        ];
    }

    public function getPermalinkAttribute()
    {
        return  "/" . Post::table() . "/" . $this->slug;
    }
}
