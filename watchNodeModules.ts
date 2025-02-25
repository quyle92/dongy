import type { PluginOption } from "vite";

//Ref: https://github.com/vitejs/vite/issues/8619#issuecomment-1654973621
export function watchNodeModules(modules: string[]): PluginOption {
    return {
        name: "watch-node-modules",
        config() {
            return {
                server: {
                    watch: {
                        ignored: modules.map((m) => `!**/node_modules/${m}/**`),
                    },
                },
            };
        },
    };
}
