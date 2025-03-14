import React from "react";
import "./page-auth.css";
import { Alert, Card, Col, Form } from "react-bootstrap";
import { usePage, useForm } from "@inertiajs/react";

function Login() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: "",
        password: "",
        rememberMe: false,
    });

    function submit(e) {
        e.preventDefault();
        post("/authenticate", {
            onSuccess: () => {
                clearErrors();
            },
        });
    }

    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner py-4">
                    {flash.message && (
                        <Alert variant={"danger"} dismissible>
                            {flash.message}
                        </Alert>
                    )}
                    <Card>
                        <Card.Body>
                            <h4 className="mb-1 pt-2">Welcome to Vuexy! 👋</h4>
                            <p className="mb-4">
                                Please sign-in to your account and start the
                                adventure
                            </p>

                            <Form className="mb-3" noValidate onSubmit={submit}>
                                <Form.Group className="mb-3">
                                    <Form.Label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        autoFocus
                                        value={data.email ?? ""}
                                        onChange={(e) => {
                                            setData("email", e.target.value);
                                        }}
                                        isInvalid={errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Col className="d-flex justify-content-between">
                                        <Form.Label
                                            className="form-label"
                                            htmlFor="password"
                                        >
                                            Password
                                        </Form.Label>
                                        <a href="auth-forgot-password-basic.html">
                                            <small>Forgot Password?</small>
                                        </a>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="············"
                                            aria-describedby="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            isInvalid={errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="rememberMe"
                                            name="rememberMe"
                                            value={data.rememberMe}
                                            onChange={(e) =>
                                                setData(
                                                    e.target.name,
                                                    !data.rememberMe,
                                                )
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="rememberMe"
                                        >
                                            Remember Me
                                        </label>
                                    </div>
                                </Form.Group>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary d-grid w-100"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Login;
