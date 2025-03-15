<x-layout>
    <x-title :url="asset('assets/img/post-bg.jpg')">Home page</x-title>
    <!-- Post Content-->
    <article class="mb-4">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    {{ $post->content }}
                </div>
            </div>
        </div>
    </article>
</x-layout>