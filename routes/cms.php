<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Controllers\Cms\PostManagementController;
use App\Http\Controllers\Cms\PictureManagementController;
use App\Http\Controllers\Cms\CategoryController;
use App\Http\Controllers\Cms\Auth\LoginController;

Route::get("/test", function () {
    return Post::first();
});

const HOME_PAGE = "home";

Route::get("/login", [LoginController::class, 'login'])->name('login')->middleware('guest');
Route::post("/authenticate", [LoginController::class, 'authenticate'])->middleware('guest');
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get("/", function () {
        return Redirect::route(HOME_PAGE);
    });
    Route::get("/logout", [LoginController::class, 'logout'])->name('login');

    /**
     * Post
     * */
    //ANCHOR["id=get_a_post]
    Route::get('/posts', [PostManagementController::class, 'index'])->name(HOME_PAGE);
    Route::get('/posts/create', [PostManagementController::class, 'create']);
    Route::post('/posts/create/upload-image', [PostManagementController::class, 'uploadImage'])->name("posts.create.uploadImage");
    Route::post('/posts', [PostManagementController::class, 'store'])->name("posts.store");
    Route::get('/posts/{post}/edit', [PostManagementController::class, 'edit'])->name("posts.edit");
    Route::post('/posts/update/{post}', [PostManagementController::class, 'update'])->name("posts.update");
    Route::post('/posts/delete', [PostManagementController::class, 'destroy'])->name("posts.delete");

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
