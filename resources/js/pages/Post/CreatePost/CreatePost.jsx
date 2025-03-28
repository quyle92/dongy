import React from "react";
import Layout from "@/layout/Layout";
import PostEditor from "@/pages/Post/component/PostEditor";
import { usePage } from "@inertiajs/react";

function CreatePost() {
    const { postStorePath } = usePage().props;

    return (
        <PostEditor
            formData={{ title: "", content: "", category_id: "", source: "" }}
            submitRoute={postStorePath}
        />
    );
}

export default CreatePost;
CreatePost.layout = (page) => <Layout children={page}></Layout>;
