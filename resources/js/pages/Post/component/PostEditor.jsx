import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import { usePage, useForm } from "@inertiajs/react";

import "ckeditor5/ckeditor5.css";
import { plugins } from "@/components/ckeditor/plugins";
import { toolbar } from "@/components/ckeditor/toolbar";
import { imageConfig } from "@/components/ckeditor/imageConfig";
import { headingConfig } from "@/components/ckeditor/headingConfig";
import { tableConfig } from "@/components/ckeditor/tableConfig";
import { fontFamilyConfig } from "@/components/ckeditor/fontFamilyConfig";
import { Card, Row, Col, Form, Button, Alert, Stack } from "react-bootstrap";
import { SimpleUploadAdapter } from "ckeditor5";
import isEmpty from "lodash/isEmpty";

function PostEditor({ formData, submitRoute }) {
    const { categories, imageUploadUrl, flash, postStatus, permalink } =
        usePage().props;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        recentlySuccessful,
    } = useForm(formData);

    function submit(e) {
        e.preventDefault();
        post(submitRoute, {
            onSuccess: () => {
                clearErrors();
            },
        });
    }

    return (
        <Form noValidate onSubmit={submit}>
            {recentlySuccessful && (
                <Alert variant="success">{flash.message || "Success!"}</Alert>
            )}
            {!isEmpty(errors) && (
                <Alert variant={"danger"}>
                    There is something wrong with your input. Please check
                    again!
                </Alert>
            )}
            <Row md={2} className="g-3">
                <Col md={10}>
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <SubmitButton processing={processing} />
                                <div className="mb-1">
                                    <input type="hidden" value={data.id} />
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title"
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
                                    <Permalink permalink={permalink} />
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
                                            toolbar: [...toolbar],
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
                                <div className="mb-3">
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        name="source"
                                        value={data.source ?? ""}
                                        onChange={(e) =>
                                            setData("source", e.target.value)
                                        }
                                        placeholder="Source"
                                        isInvalid={errors.source}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.source}
                                    </Form.Control.Feedback>
                                    <div className="mb-3">
                                        <Permalink permalink={permalink} />
                                    </div>
                                </div>
                                <SubmitButton processing={processing} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Stack gap={3}>
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
                                            checked={
                                                category.id == data.category_id
                                                    ? true
                                                    : false
                                            }
                                        />
                                    );
                                })}
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header
                                style={{
                                    background: "#F8F8F8",
                                }}
                                className="fw-bold"
                            >
                                Status
                            </Card.Header>
                            <Card.Body>
                                {postStatus.map((status, index) => {
                                    return (
                                        <Form.Check
                                            type="radio"
                                            key={status}
                                            value={status}
                                            label={status}
                                            name="status"
                                            onChange={(e) =>
                                                setData(
                                                    e.target.name,
                                                    e.target.value,
                                                )
                                            }
                                            isInvalid={errors.status}
                                            feedback={
                                                index === postStatus.length - 1
                                                    ? errors.status
                                                    : ""
                                            }
                                            feedbackType="invalid"
                                            checked={
                                                status == data.status
                                                    ? true
                                                    : false
                                            }
                                        />
                                    );
                                })}
                            </Card.Body>
                        </Card>
                        {/* <div className="d-flex mb-3">
                            <Button variant="info" type="submit">
                                View
                            </Button>
                        </div> */}
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default PostEditor;

function SubmitButton({ processing }) {
    return (
        <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" type="submit" disabled={processing}>
                Submit
            </Button>
        </div>
    );
}

function Permalink({ permalink }) {
    return (
        <strong>
            Permalink:
            <a href={permalink} target="_blank" rel="noreferrer">
                {permalink}
            </a>
        </strong>
    );
}
