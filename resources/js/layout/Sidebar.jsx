import React from "react";
import { Link, usePage } from "@inertiajs/react";
import menuItems from "@/menu";
import Pluralize from "pluralize";
import { titleCase } from "@/utils/helpers";

const Sidebar = () => {
    const { url } = usePage();

    //prevent page reload when re-clicking same Page.
    const itemClick = (event, currentPath) => {
        if (url === currentPath) {
            event.preventDefault();
            return;
        }
    };
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
                            className={`menu-item ${url.startsWith(menuItem.path) ? "active" : ""}`}
                        >
                            <Link
                                href={menuItem.path}
                                className="menu-link"
                                onClick={(e) => itemClick(e, menuItem.path)}
                            >
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
