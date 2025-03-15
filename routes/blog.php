<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Blog\PostController;

Route::get('/', [PostController::class, 'index']);
Route::get('/posts/{post:slug}', [PostController::class, 'show']);
