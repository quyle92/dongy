<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Http\Requests\StorePostRequest;
use App\Actions\GetPostList;

class PostController extends Controller
{
    public function index(Request $request)
    {
        //if this is page reload && there is query param, then redirect to main route without query params.
        if ($request->header('x-inertia') === null && count($request->query()) > 0) {
            return redirect('posts');
        }

        $postList = app(GetPostList::class)->handle($request);
        return Inertia::render('Post/Post', [
            'posts' => $postList
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/CreatePost/CreatePost', [
            "pageName" => "Create Post",
            'categories' => Category::all(["id", "name", "slug"]),
            "imageUploadUrl" => route("posts.create.uploadImage")
        ]);
    }

    public function uploadImage(Request $request)
    {
        $path = Storage::putFile('photos',  $request->file('upload'));

        return [
            "url" => Storage::url($path)
        ];
    }

    public function store(StorePostRequest $request)
    {
        Post::create($request->validated());

        return redirect()->back()->with('message', 'Post created!');
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
