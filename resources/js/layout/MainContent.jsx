import React from "react";
import { Card } from "react-bootstrap";

export default function MainContent({ children }) {
    return (
        <div className="layout-page">
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
            >
                <div
                    className="navbar-nav-right d-flex align-items-center"
                    id="navbar-collapse"
                >
                    <div className="navbar-nav align-items-center"></div>
                </div>
            </nav>

            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <Card>
                        <Card.Body>{children}</Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}
