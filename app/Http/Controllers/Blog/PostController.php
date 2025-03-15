<?php

namespace App\Http\Controllers\Blog;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    public function index(Request $request)
    {
        return view('blog.home', [
            "posts" => Post::simplePaginate()
        ]);
    }

    public function show(Request $request, Post $post)
    {
        return view('blog.post', [
            "post" => $post
        ]);
    }
}
