import { ChangeEvent, useState, KeyboardEvent, useCallback } from "react";
import { router, usePage } from "@inertiajs/react";

import { appendQueryParams, getQueryParam } from "@/utils/url";
import { QUERY_STRING } from "@/config/query";

export const useSearch = () => {
    const defaultQueryValue = getQueryParam(QUERY_STRING.QUERY_KEY) ?? "";

    const [query, setQuery] = useState(defaultQueryValue);
    const [isLoading, setIsLoading] = useState(false);
    const { url } = usePage();

    const navigateTo = useCallback(
        (path?: string) => {
            const route = appendQueryParams(url, {
                [QUERY_STRING.QUERY_KEY]: path ?? query,
            });

            router.visit(route, {
                preserveState: true,
                preserveScroll: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            });
        },
        [query, url]
    );

    const navigateToSearchRoute = () => {
        navigateTo();
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        navigateTo(e.target.value);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            navigateTo();
        }
    };

    return {
        onInputChange,
        onKeyDown,
        navigateToSearchRoute,
        query,
        isLoading,
    };
};
