import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
        eslint(),
    ],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "resources/js/tests/setup.ts",
    },
});
