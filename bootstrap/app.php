<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Application;
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        using: function () {
            Route::middleware('web')
                ->group(base_path('routes/cms.php'));

            Route::group([], base_path('routes/blog.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->redirectGuestsTo('/login');

        $middleware->web(append: [
            HandleInertiaRequests::class
        ]);

        $middleware->validateCsrfTokens(except: [
            '/posts/create/upload-image',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e) {
            // dd($e);
            if (
                !$e instanceof \Illuminate\Validation\ValidationException &&
                !$e  instanceof \Illuminate\Auth\AuthenticationException
            ) {
                dd($e);
            }
        });
    })->create();
