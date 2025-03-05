import React, { useState } from "react";
import Layout from "@/layout/Layout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import { usePage, useForm } from "@inertiajs/react";

import "ckeditor5/ckeditor5.css";
import { plugins } from "./ckeditor/plugins";
import { toolbar } from "./ckeditor/toolbar";
import { imageConfig } from "./ckeditor/imageConfig";
import { headingConfig } from "./ckeditor/headingConfig";
import { tableConfig } from "./ckeditor/tableConfig";
import { fontFamilyConfig } from "./ckeditor/fontFamilyConfig";
import { Card, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { SimpleUploadAdapter } from "ckeditor5";

function CreatePost() {
    const { categories, imageUploadUrl, flash } = usePage().props;
    const [success, setSuccess] = useState(false);
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        title: "",
        content: "",
        category_id: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/posts", {
            onSuccess: () => {
                setSuccess(true);
                clearErrors();
            },
        });
    }

    return (
        <Form noValidate onSubmit={submit}>
            {success && <Alert variant={"success"}>{flash.message}</Alert>}
            <Row md={2} className="g-3">
                <Col md={10}>
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="d-flex justify-content-end mb-3">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <div className="mb-3">
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={data.title ?? ""}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        isInvalid={errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </div>
                                <div className="mb-3">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            licenseKey: "GPL",
                                            plugins: [
                                                ...plugins,
                                                SimpleUploadAdapter,
                                            ],
                                            toolbar: toolbar,
                                            image: imageConfig,
                                            heading: headingConfig,
                                            table: tableConfig,
                                            fontFamily: fontFamilyConfig,
                                            // initialData: "<p>Hello from CKEditor 5 in React!</p>",
                                            simpleUpload: {
                                                // The URL that the images are uploaded to.
                                                uploadUrl: imageUploadUrl,
                                            },
                                        }}
                                        onChange={(event, editor) =>
                                            setData("content", editor.getData())
                                        }
                                        data={data.content}
                                    />
                                    <Form.Control.Feedback
                                        type="invalid"
                                        style={{ display: "block" }}
                                    >
                                        {errors.content}
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Header
                            style={{
                                background: "#F8F8F8",
                            }}
                            className="fw-bold"
                        >
                            Category
                        </Card.Header>
                        <Card.Body>
                            {categories.map((category, index) => {
                                return (
                                    <Form.Check
                                        type="radio"
                                        key={category.id}
                                        id={category.id}
                                        value={category.id}
                                        label={category.name}
                                        name="category_id"
                                        onChange={(e) =>
                                            setData(
                                                e.target.name,
                                                e.target.value,
                                            )
                                        }
                                        isInvalid={errors.category_id}
                                        feedback={
                                            index === categories.length - 1
                                                ? errors.category_id
                                                : ""
                                        }
                                        feedbackType="invalid"
                                    />
                                );
                            })}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
}

export default CreatePost;
CreatePost.layout = (page) => <Layout children={page}></Layout>;
