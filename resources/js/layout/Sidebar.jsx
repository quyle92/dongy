import React from "react";
import { Link, usePage } from "@inertiajs/react";
import menuItems from "@/menu";
import Pluralize from "pluralize";
import { titleCase, cleanUrl } from "@/utils/helpers";

const Sidebar = () => {
    const { url } = usePage(),
        baseUrl = cleanUrl(url);

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
                {menuItems.map(function (menuItem) {
                    return (
                        <li
                            key={menuItem.id}
                            className={`menu-item ${baseUrl === menuItem.path ? "active" : ""}`}
                        >
                            <Link href={menuItem.path} className="menu-link">
                                <i className="menu-icon tf-icons ti ti-smart-home"></i>
                                <div data-i18n="Page 1">
                                    {Pluralize(titleCase(menuItem.id))}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
