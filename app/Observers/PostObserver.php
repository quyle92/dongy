<?php

namespace App\Observers;

use Illuminate\Support\Facades\Artisan;
use App\Models\Post;

class PostObserver
{
    /**
     * Handle the Post "created" event.
     */
    public function created(Post $post): void
    {
        Artisan::command("php artisan backup:run --only-db");
    }

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        Artisan::command("php artisan backup:run --only-db");
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleted(Post $post): void
    {
        Artisan::command("php artisan backup:run --only-db");
    }

    /**
     * Handle the Post "restored" event.
     */
    public function restored(Post $post): void
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     */
    public function forceDeleted(Post $post): void
    {
        //
    }
}
