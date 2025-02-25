import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import "../css/core.css";
import "../css/demo.css";
import "../css/theme-default.css";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        return pages[`./pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
