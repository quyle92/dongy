<x-layout>
    <x-title :url="asset('assets/img/home-bg.jpg')">Home page</x-title>
    <div class="container px-4 px-lg-5">
        <div class="d-flex">
            @if (count($posts) === 0)
            <div class="m-auto">No posts found!</div>
            @endif
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-8">
                    @isset($search)
                    <h3>Search results for: "<span class="fst-italic">{{ $search  }}</span>"</h3>
                    @endisset
                    @foreach ($posts as $post)
                    <!-- Post preview-->
                    <div class="post-preview">
                        <a href="/posts/{{$post->slug}}" class="link-underline link-underline-opacity-0 ">
                            <h2 class="post-title">{{Str::title($post->title)}}</h2>
                        </a>
                        <div class="d-block">{!! Str::limit($post->content,200) !!}</div>
                        <!-- Divider-->
                        <hr class="my-4" />
                        <!-- Pager-->
                    </div>
                    <!-- End Post preview-->
                    @endforeach
                    {{ $posts->links() }}
                    <!-- Search bar -->
                </div>
                <x-search action="/posts/search" search="{{$search ?? ''}}"></x-search>

            </div>
        </div>
        @push('scripts')
        <script src="/js/post-script.js"></script>
        @endpush
</x-layout>