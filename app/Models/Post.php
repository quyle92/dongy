<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Traits\HasSlug;

class Post extends Model
{
    use HasFactory, HasSlug;
}
