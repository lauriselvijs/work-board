import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import route from "ziggy-js";

import { Page } from "./types";
import AppLayout from "./layouts/AppLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
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
                page.default.layout ||
                ((page) => <AppLayout children={page} />);

            return page;
        },
        setup: ({ App, props }) => {
            global.route = (name, params, absolute) =>
                // @ts-expect-error
                route(name, params, absolute, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.ziggy.location),
                });

            return <App {...props} />;
        },
    })
);
