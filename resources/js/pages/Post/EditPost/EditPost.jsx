import React from "react";
import Layout from "@/layout/Layout";
import PostEditor from "@/pages/Post/component/PostEditor";
import { usePage } from "@inertiajs/react";

function EditPost() {
    const { post, postUpdatePath } = usePage().props;

    return (
        <PostEditor
            formData={{
                title: post.title,
                content: post.content,
                category_id: post.category_id,
                status: post.status,
                source: post.source,
            }}
            submitRoute={postUpdatePath}
        />
    );
}

export default EditPost;
EditPost.layout = (page) => <Layout children={page}></Layout>;
