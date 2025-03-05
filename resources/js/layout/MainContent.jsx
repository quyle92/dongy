import React from "react";
import { usePage } from "@inertiajs/react";

export default function MainContent({ children }) {
    const { pageName } = usePage().props;

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
                    <div className="navbar-nav align-items-center fw-bold initialism breadcrumb">
                        {pageName}
                    </div>
                </div>
            </nav>

            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    {children}
                </div>
            </div>
        </div>
    );
}
