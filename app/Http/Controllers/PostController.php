<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Actions\GetPostList;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $postList = app(GetPostList::class)->handle($request);

        return Inertia::render('Post/Post', [
            'posts' => $postList
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/CreatePost/CreatePost');
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
