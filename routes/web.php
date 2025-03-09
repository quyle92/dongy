<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

Route::get("/test", function () {
    return Post::with('category')->paginate();
});

/**
 * Post
 * */
//ANCHOR["id=get_a_post]
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/create', [PostController::class, 'create']);
Route::post('/posts/create/upload-image', [PostController::class, 'uploadImage'])->name("posts.create.uploadImage");
Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts/{post}/edit', [PostController::class, 'edit']);
Route::put('/posts/{post}', [PostController::class, 'update']);
Route::delete('/posts/{post}', [PostController::class, 'destroy']);


/**
 * Category
 * */
Route::get('/categories', [CategoryController::class, 'index']);

/**
 * TESTING ONY
 * */
Route::get('/welcome', function (Request $request) {
    if ($request->has('page_id')) {

        return redirect('welcome');
    }

    return view('welcome');
});
