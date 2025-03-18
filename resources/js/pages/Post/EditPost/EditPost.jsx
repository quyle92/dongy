import React from "react";
import Layout from "@/layout/Layout";
import PostEditor from "@/pages/Post/component/PostEditor";
import { usePage } from "@inertiajs/react";

function EditPost() {
    const { post } = usePage().props;

    return (
        <PostEditor
            formData={{
                title: post.title,
                content: post.content,
                category_id: post.category_id,
                status: post.status,
                source: post.source,
            }}
            submitRoute={`/posts/${post.id}`}
        />
    );
}

export default EditPost;
EditPost.layout = (page) => <Layout children={page}></Layout>;
