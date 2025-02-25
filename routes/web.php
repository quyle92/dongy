<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

//ANCHOR["id=get_a_post]
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::view('/welcome', 'welcome');
