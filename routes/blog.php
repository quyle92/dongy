<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Blog\PostController;

Route::get('/', [PostController::class, 'index']);
Route::get('/posts/search', [PostController::class, 'search']);
Route::get('/posts/{post:slug}', [PostController::class, 'show']);
