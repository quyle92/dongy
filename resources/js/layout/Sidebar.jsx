import React from "react";
import { Link } from "@inertiajs/react";

const Sidebar = () => {
    return (
        <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
        >
            <div className="app-brand demo">
                <a href={undefined} className="app-brand-link">
                    <span className="app-brand-logo demo"></span>
                    <span className="app-brand-text demo menu-text fw-bold">
                        TCM
                    </span>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                <li className="menu-item active">
                    <Link href="/posts" className="menu-link">
                        <i className="menu-icon tf-icons ti ti-smart-home"></i>
                        <div data-i18n="Page 1">Page 1</div>
                    </Link>
                </li>
                <li className="menu-item">
                    <a href="page-2.html" className="menu-link">
                        <i className="menu-icon tf-icons ti ti-app-window"></i>
                        <div data-i18n="Page 2">Page 2</div>
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
