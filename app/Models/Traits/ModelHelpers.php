<?php

declare(strict_types=1);

namespace App\Models\Traits;

trait ModelHelpers
{
    public static function table(): string
    {
        return (new static())->getTable();
    }

    public static function last()
    {
        return static::all()->last();
    }

    public static function second()
    {
        return static::all()->skip(1)->take(1)->first();
    }

    public static function third()
    {
        return static::all()->skip(2)->take(1)->first();
    }
}
