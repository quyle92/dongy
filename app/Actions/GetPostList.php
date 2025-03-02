<?php

declare(strict_types=1);

namespace App\Actions;

use Illuminate\Http\Request;
use App\Models\Post;

class GetPostList
{
    public function handle(Request $request)
    {
        $sql = Post::query();
        if ($globalFilter = $request->globalFilter) {
            $sql = $sql->with('category')->where("title", "LIKE", '%' . $globalFilter . '%')
                ->orWhere("content", "LIKE", '%' . $globalFilter . '%');
        } else {
            $sql = Post::with('category');
        }

        return $sql->paginate(
            perPage: $request->perPage,
            page: $request->page,
        );
    }
}
