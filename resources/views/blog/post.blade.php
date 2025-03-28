<x-layout>
    <x-title :url="asset('assets/img/post-bg.jpg')">{{Str::title($post->title)}}</x-title>
    <div class="container">
        <div class="d-flex ">
            <!-- Post Content-->
            <article class="col-md-9 mb-4">
                <div class="px-2 px-lg-1">
                    <div class="row gx-2 gx-lg-1 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7 ">
                            {!! $post->content !!}
                            <span class="fst-italic"> Source: {{ ($post->source) }}</span>

                        </div>
                    </div>
                </div>

            </article>


            <!-- Search bar -->
            <x-search action="/posts/search"></x-search>
        </div>
    </div>
    @push('scripts')
    <script src="/js/post-script.js"></script>
    @endpush
</x-layout>