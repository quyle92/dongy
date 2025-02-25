import React from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar />
                <MainContent children={children} />
            </div>
        </div>
    );
}

export default Layout;
