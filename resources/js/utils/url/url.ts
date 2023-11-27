export const parseUrl = (url: string): [string, string[]] => {
    const urlParts = url.split("?");
    const baseUrl = urlParts[0];
    const existingParams = urlParts[1] ? urlParts[1].split("&") : [];
    return [baseUrl, existingParams];
};

export const filterExistingParams = (
    existingParams: string[],
    queryParams: Record<string, string | number>
): string[] => {
    return existingParams.filter((param) => {
        const paramName = param.split("=")[0];
        return !queryParams.hasOwnProperty(paramName) && param.split("=")[1];
    });
};

export const constructNewQueryString = (
    queryParams: Record<string, string | number>
): string => {
    return Object.entries(queryParams)
        .map(([key, value]) =>
            value
                ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                : ""
        )
        .join("&");
};

export const appendQueryParams = (
    url: string,
    queryParams: Record<string, string | number>
): string => {
    const [baseUrl, existingParams] = parseUrl(url);
    const filteredParams = filterExistingParams(existingParams, queryParams);
    const newParams = constructNewQueryString(queryParams);
    const modifiedURL =
        baseUrl +
        (filteredParams.length
            ? `?${filteredParams.join("&")}${newParams ? "&" : ""}`
            : "?") +
        newParams;
    return modifiedURL;
};

export const getQueryParam = (
    parameterName: string,
    optionalUrl?: string
): string | null => {
    const queryString = optionalUrl ?? window.location.search;
    const searchParams = new URLSearchParams(queryString);
    return searchParams.get(parameterName);
};
