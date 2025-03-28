<?php

namespace App\Console\Commands;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Console\Command;
use App\Models\Post;

class DeleteUnusedImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-unused-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'delele unused images';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $postImages = Post::all()->flatMap(function ($post) {
            $imagePaths = extractImagePaths($post->content);
            $imagePaths = array_map(function ($imagePath) {
                return Str::after($imagePath, "/storage/");
            }, $imagePaths);

            return $imagePaths;
        });

        $imagesInFileSystem =  collect(Storage::files("/images"));
        $unusedImages = $imagesInFileSystem->diff($postImages);

        if ($unusedImages->count() > 0) {
            $unusedImages->each(function ($img) {
                Storage::delete($img);
            });

            Artisan::command("php artisan backup:run --only-files");
        }
    }
}
