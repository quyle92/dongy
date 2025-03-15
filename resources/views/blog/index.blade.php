<x-title>Home page</x-title>
<x-layout>
    <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
                @foreach ($posts as $post)
                <!-- Post preview-->
                <div class="post-preview">
                    <a href="post.html">
                        <h2 class="post-title">{{$post->title}}</h2>
                    </a>
                    <p>{{Str::limit($post->content,200)}}</p>
                </div>
                <!-- Divider-->
                <hr class="my-4" />
                @endforeach
                <!-- Pager-->
                {{ $posts->links() }}
            </div>
        </div>
    </div>
</x-layout>