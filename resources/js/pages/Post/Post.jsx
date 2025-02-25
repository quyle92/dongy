import { usePage } from "@inertiajs/react";
import Layout from "@/layout/Layout";

export default function Post() {
    const { posts } = usePage().props;

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

Post.layout = (page) => <Layout children={page}></Layout>;
