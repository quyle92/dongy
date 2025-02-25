<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Post/Post', [
            'posts' => Post::all()
        ]);
    }

    //LINK /opt/homebrew/var/www/dongy/routes/web.php#get_a_post
    public function show($id)
    {
        $post = Post::findOrFail($id);

        return Inertia::render('Post/EditPost', [
            'post' => $post->only(
                'id',
                'title',
                'content',
            ),
        ]);
    }
}
