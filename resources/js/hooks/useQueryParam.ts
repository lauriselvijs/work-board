import { PageProps } from "@/types";
import { Entity } from "@/types/Entity";
import { appendQueryParams } from "@/utils/url";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export const useSetQueryParam = (id?: Entity, optionalUrl?: string) => {
    const { url } = usePage<PageProps>();
    const [isLoading, setIsLoading] = useState(false);

    const setQueryParam = (
        key: string,
        value: string | number,
        onSuccess: () => void
    ) => {
        const newRoute = appendQueryParams(optionalUrl ?? url, {
            [key]: value,
        });

        router.visit(newRoute, {
            preserveState: true,
            preserveScroll: true,
            onSuccess,
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
            ...(id ? { only: [id] } : {}),
        });
    };

    return { isLoading, setQueryParam };
};
