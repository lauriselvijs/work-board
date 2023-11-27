import { useState } from "react";

import { Option, OptionProps } from "@/types/Components";
import { getQueryParam } from "@/utils/url";
import { Entity } from "@/types/Entity";
import { DEFAULT_SORT_ORDER, QUERY_STRING, SORT_ORDER } from "@/config/query";
import { useSetQueryParam } from "@/hooks/useQueryParam";

const { SORT_KEY, ORDER_KEY, FILTER_KEY } = QUERY_STRING;

// Common hook for managing sorting, filtering, or any query parameter
const useQueryParamOnSelect = (
    paramKey: string,
    options: OptionProps,
    id?: Entity
) => {
    //TODO:
    //     // [ ] - Move logic to php code
    const defaultValue =
        options.find((option) => option.value.id === getQueryParam(paramKey))
            ?.value || options[0].value;

    const [paramValue, setParamValue] = useState(defaultValue);
    const { isLoading, setQueryParam } = useSetQueryParam(id);

    const onParamChange = (value: Option) => {
        setQueryParam(paramKey, value.id, () => {
            setParamValue(value);
        });
    };

    return { onParamChange, paramValue, isLoading };
};

export const useSort = (sortBy: OptionProps, id?: Entity) => {
    return useQueryParamOnSelect(SORT_KEY, sortBy, id);
};

export const useFilter = (
    filterBy: OptionProps,
    filterKey = FILTER_KEY,
    id?: Entity
) => {
    return useQueryParamOnSelect(filterKey, filterBy, id);
};

const useSortOrder = (id?: Entity) => {
    const defaultOrderValue =
        Object.values(SORT_ORDER).find(
            (order) => order === getQueryParam(ORDER_KEY)
        ) || DEFAULT_SORT_ORDER;

    const [sortOrder, setSortOrder] = useState(defaultOrderValue);
    const { isLoading, setQueryParam } = useSetQueryParam(id);

    const onSortOrderBtnClick = () => {
        const newSortOrder =
            sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC;

        setQueryParam(ORDER_KEY, newSortOrder, () => {
            setSortOrder(newSortOrder);
        });
    };

    return { onSortOrderBtnClick, sortOrder, isLoadingSortOrder: isLoading };
};

export const useFilterLayout = (
    filterBy: OptionProps,
    sortBy: OptionProps,
    id?: Entity
) => {
    const {
        onParamChange: onSortByChange,
        isLoading: isLoadingSort,
        paramValue: sorted,
    } = useSort(sortBy, id);
    const { sortOrder, onSortOrderBtnClick, isLoadingSortOrder } =
        useSortOrder(id);
    const {
        onParamChange: onFilterChange,
        isLoading: isLoadingFilter,
        paramValue: filtered,
    } = useFilter(filterBy, id);

    const isAscending = sortOrder === SORT_ORDER.ASC;

    return {
        isAscending,
        isLoadingSort,
        sortOrder,
        onSortByChange,
        onSortOrderBtnClick,
        onFilterChange,
        isLoadingFilter,
        filtered,
        sorted,
        isLoadingSortOrder,
    };
};
