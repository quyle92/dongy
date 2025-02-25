<?php

declare(strict_types=1);

namespace App\Models\Traits;

use Illuminate\Support\Str;
use PhpParser\Node\Stmt\TryCatch;

trait HasSlug
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $source = $model->title ?? $model->name;

            $model->slug = Str::slug($source);
        });
    }
}
