import { QueryString, SortOrder as ISortOrder } from "@/types/Query";

export const QUERY_STRING: Readonly<QueryString> = {
    QUERY_KEY: "query",
    SORT_KEY: "sort",
    ORDER_KEY: "order",
    FILTER_KEY: "filter",
};

export const DEFAULT_SORT_ORDER = "asc";

export const SORT_ORDER: Readonly<ISortOrder> = {
    ASC: "asc",
    DESC: "desc",
};
