<?php

declare(strict_types=1);

namespace App\Enums;

use App\Enums\Traits\EnumToArray;

enum PostStatus: string
{
    use EnumToArray;

    case PUBLISHED = 'published';
    case DRAFT = 'draft';
}
