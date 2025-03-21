<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Controllers\Cms\PostController;
use App\Http\Controllers\Cms\CategoryController;
use App\Http\Controllers\Cms\Auth\LoginController;

Route::get("/test", function () {
    printBacktrace();
    return Post::with('category')->paginate();
});

Route::get("/login", [LoginController::class, 'login'])->name('login')->middleware('guest');
Route::post("/authenticate", [LoginController::class, 'authenticate'])->middleware('guest');
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get("/logout", [LoginController::class, 'logout'])->name('login');

    /**
     * Post
     * */
    //ANCHOR["id=get_a_post]
    Route::get('/posts', [PostController::class, 'index'])->name("home");
    Route::get('/posts/create', [PostController::class, 'create']);
    Route::post('/posts/create/upload-image', [PostController::class, 'uploadImage'])->name("posts.create.uploadImage");
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{post}/edit', [PostController::class, 'edit']);
    Route::post('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);


    /**
     * Category
     * */
    Route::get('/categories', [CategoryController::class, 'index']);
});

/**
 * TESTING ONY
 * */
Route::get('/welcome', function (Request $request) {
    if ($request->has('page_id')) {

        return redirect('welcome');
    }

    return view('welcome');
});
