import {
    parseUrl,
    filterExistingParams,
    constructNewQueryString,
    appendQueryParams,
} from "."; // Import your functions here

describe("parseUrl", () => {
    it("should parse a URL correctly", () => {
        const url = "http://example.com/path?param1=value1&param2=value2";
        const [baseUrl, existingParams] = parseUrl(url);
        expect(baseUrl).toBe("http://example.com/path");
        expect(existingParams).toEqual(["param1=value1", "param2=value2"]);
    });

    it("should handle URLs without query parameters", () => {
        const url = "http://example.com/path";
        const [baseUrl, existingParams] = parseUrl(url);
        expect(baseUrl).toBe("http://example.com/path");
        expect(existingParams).toEqual([]);
    });
});

describe("filterExistingParams", () => {
    it("should filter existing parameters correctly", () => {
        const existingParams = ["param1=value1", "param2=value2"];
        const queryParams = { param2: "new-value", param3: "value3" };
        const filtered = filterExistingParams(existingParams, queryParams);
        expect(filtered).toEqual(["param1=value1"]);
    });
});

describe("constructNewQueryString", () => {
    it("should construct a new query string", () => {
        const queryParams = { param1: "value1", param2: "value2" };
        const queryString = constructNewQueryString(queryParams);
        expect(queryString).toBe("param1=value1&param2=value2");
    });

    it("should handle empty query parameters", () => {
        const queryParams = {};
        const queryString = constructNewQueryString(queryParams);
        expect(queryString).toBe("");
    });
});

describe("appendQueryParams", () => {
    it("should append query parameters to a URL", () => {
        const url = "http://example.com/path?param1=value1";
        const queryParams = { param2: "value2", param3: "value3" };
        const modifiedURL = appendQueryParams(url, queryParams);
        expect(modifiedURL).toBe(
            "http://example.com/path?param1=value1&param2=value2&param3=value3"
        );
    });
});
