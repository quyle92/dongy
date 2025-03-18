<?php

namespace App\Http\Controllers\Cms;

use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Http\Requests\UpsertPostRequest;
use App\Http\Controllers\Controller;
use App\Enums\PostStatus;
use App\Actions\GetPostList;

class PostManagementController extends Controller
{
    public function index(Request $request)
    {
        //if this is page reload && there is query param, then redirect to main route without query params.
        if ($request->header('x-inertia') === null && count($request->query()) > 0) {
            return redirect('posts');
        }

        $postList = app(GetPostList::class)->handle($request);
        return Inertia::render('Post/Post', [
            'pageName' => "Posts",
            'posts' => $postList
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/CreatePost/CreatePost', [
            "pageName" => "Create Post",
            'categories' => Category::all(["id", "name", "slug"]),
            "imageUploadUrl" => route("posts.create.uploadImage"),
            "postStatus" => PostStatus::values()
        ]);
    }

    public function uploadImage(Request $request)
    {
        $path = Storage::putFile('photos',  $request->file('upload'));

        return [
            "url" => parse_url(Storage::url($path), PHP_URL_PATH)
        ];
    }

    public function store(UpsertPostRequest $request)
    {
        Post::create($request->validated());

        return redirect()->back()->with('message', 'Post created!');
    }


    //LINK /opt/homebrew/var/www/dongy/routes/web.php#get_a_post
    public function edit(Post $post)
    {
        return Inertia::render('Post/EditPost/EditPost', [
            'post' => $post->only(
                'id',
                'title',
                'content',
                'category_id',
                'status',
                'source',
            ),
            "pageName" => "Edit Post",
            'categories' => Category::all(["id", "name", "slug"]),
            "imageUploadUrl" => route("posts.create.uploadImage"),
            "postStatus" => PostStatus::values()
        ]);
    }

    public function update(UpsertPostRequest $request, Post $post)
    {
        $validated = (object) $request->validated();

        $post->title = $validated->title;
        $post->category_id = $validated->category_id;
        $post->content = $validated->content;
        $post->status = $validated->status;
        $post->source = $validated->source;

        $post->save();

        return redirect()->back()->with('message', 'Post updated!');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->back()->with('message', 'Post deleted!');
    }
}
