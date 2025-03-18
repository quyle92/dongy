import React from "react";
import Layout from "@/layout/Layout";
import PostEditor from "@/pages/Post/component/PostEditor";

function CreatePost() {
    return (
        <PostEditor
            formData={{ title: "", content: "", category_id: "", source: "" }}
            submitRoute="/posts"
        />
    );
}

export default CreatePost;
CreatePost.layout = (page) => <Layout children={page}></Layout>;
