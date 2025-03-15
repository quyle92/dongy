<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Post;

Route::get('/', function (Request $request) {
    return view('blog.index', [
        "posts" => Post::simplePaginate()
    ]);
});
