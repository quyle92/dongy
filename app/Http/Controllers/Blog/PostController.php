<?php

namespace App\Http\Controllers\Blog;

use App\Enums\PostStatus;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    public function index(Request $request)
    {
        return view('blog.home', [
            "posts" => Post::where("status", PostStatus::PUBLISHED)
                ->orderByDesc("id")
                ->simplePaginate()
        ]);
    }

    public function show(Request $request, Post $post)
    {
        return view('blog.post', [
            "post" => $post
        ]);
    }

    public function search(Request $request)
    {
        $search = $request->search;
        $posts = Post::where("content",  'like', '%' . $search . '%')
            ->where("status", PostStatus::PUBLISHED)
            ->simplePaginate();

        return view('blog.home', [
            "posts" => $posts,
            "search" => $search,
        ]);
    }
}
