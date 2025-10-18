import "./bootstrap";
import "../scss/app.scss";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

import AppLayout from "@/layouts/AppLayout";
import { Page } from "@/types";
import { configureEcho } from '@laravel/echo-react';

configureEcho({
    broadcaster: 'reverb',
});

const fullConfig = resolveConfig(tailwindConfig);

const progressBarColor = fullConfig.theme?.colors?.primary;

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        let page = await resolvePageComponent(
            `./pages/${name}.ts`,
            import.meta.glob<Page>("./pages/**/*.ts")
        );

        if (name === "ErrorPage/index") {
            return page;
        }

        page.default.layout =
            page.default.layout || ((page) => <AppLayout children={page} />);

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color:
            typeof progressBarColor === "string" ? progressBarColor : undefined,
    },
});
