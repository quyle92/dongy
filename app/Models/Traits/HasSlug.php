<?php

declare(strict_types=1);

namespace App\Models\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $source = $model->title ?? $model->name;

            $model->slug = Str::slug($source);
        });

        static::saving(function ($model) {
            $source = $model->title ?? $model->name;

            $model->slug = Str::slug($source);
        });
    }
}
