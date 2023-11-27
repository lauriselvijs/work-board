import { router, usePage } from "@inertiajs/react";
import { useEffect, useSyncExternalStore } from "react";

const subscribe = (callback: any) => {
    window.addEventListener("languagechange", callback);
    return () => {
        window.removeEventListener("languagechange", callback);
    };
};

export const useBrowserLocal = () => {
    return useSyncExternalStore(subscribe, () => navigator.language);
};

export const useNavigateAway = (navigateAwayIf = true) => {
    const { url } = usePage();

    useEffect(() => {
        if (navigateAwayIf) {
            return router.on("before", (event) => {
                const sameUrlRedirect =
                    event.detail.visit.url.pathname ===
                    (url.includes("?") ? url.slice(0, url.indexOf("?")) : url);

                if (event.detail.visit.method === "get" && !sameUrlRedirect) {
                    if (
                        !window.confirm(
                            "Are you sure you want to navigate away?"
                        )
                    ) {
                        event.preventDefault();
                    }
                }
            });
        }
    }, [navigateAwayIf, url]);
};
