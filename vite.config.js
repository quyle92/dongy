import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import vitePlugin from "vite-plugin-react-js-support";
// import { pluginWatchNodeModules } from "./pluginWatchNodeModules";
import { watchNodeModules } from "./watchNodeModules";
// import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.js"],
            refresh: ["resources/js/**"],
        }),
        react(),
        vitePlugin([], { jsxInject: true }),
        // pluginWatchNodeModules(["react-bootstrap"]),
        watchNodeModules(["react-bootstrap"]),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    server: {
        hmr: {
            host: "localhost", //https://github.com/laravel/vite-plugin/pull/42
        },
        watch: {
            ignored: ["!**/node_modules/react-bootstrap/**"],
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
            // plugins: [esbuildCommonjs(["react-moment"])],
        },
    },
});
