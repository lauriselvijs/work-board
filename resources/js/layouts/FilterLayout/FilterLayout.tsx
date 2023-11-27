import { OptionProps, Paginated } from "@/types/Components";
import { useFilterLayout } from "./useFilterLayout";
import { ReactElement, ReactNode } from "react";
import Button from "@/components/Button";
import {
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
} from "@heroicons/react/20/solid";
import Select from "@/components/Select";
import Search from "@/components/Search";
import Paginator from "@/components/Paginator";
import { Head } from "@inertiajs/react";
import { Entity } from "@/types/Entity";

interface FilterLayoutProps {
    title: string;
    heading: string;
    children: ReactNode;
    /** First item in array is default value */
    sortBy: OptionProps;
    /** First item in array is default value */
    filterBy: OptionProps;
    paginationData: Paginated;
    titleForFilterBy?: string;
    /** For optimization provide key see => https://inertiajs.com/partial-reloads */
    id?: Entity;
    restFilter?: ReactElement;
}

const FilterLayout = ({
    title,
    heading,
    sortBy,
    paginationData,
    children,
    id,
    filterBy,
    titleForFilterBy,
    restFilter,
}: FilterLayoutProps) => {
    const {
        onSortByChange,
        onSortOrderBtnClick,
        sorted,
        isLoadingSortOrder,
        isLoadingSort,
        onFilterChange,
        filtered,
        isLoadingFilter,
        isAscending,
    } = useFilterLayout(filterBy, sortBy, id);

    const renderSortOrderBtn = (
        <Button
            disabled={isLoadingSortOrder}
            onClick={onSortOrderBtnClick}
            className="p-2 h-fit w-fit"
            aria-label="Sort order"
        >
            {isAscending ? (
                <ArrowSmallUpIcon className="w-5 h-5" />
            ) : (
                <ArrowSmallDownIcon className="w-5 h-5" />
            )}
        </Button>
    );

    const renderSort = (
        <Select
            optionList={sortBy}
            listbox={{
                className: "w-full sm:w-fit",
                disabled: isLoadingSort,
                value: sorted,
                name: "sort",
                onChange: onSortByChange,
            }}
            button={{
                className: "mt-1 sm:min-w-[200px] w-full",
            }}
            labelChildren={"Sort by"}
            buttonChildren={sorted.value}
        />
    );

    const renderFilter = filterBy && (
        <Select
            optionList={filterBy}
            listbox={{
                className: "w-full sm:w-fit",
                disabled: isLoadingFilter,
                value: filtered,
                name: "sort",
                onChange: onFilterChange,
            }}
            button={{
                className: "mt-1 sm:min-w-[200px] w-full",
            }}
            labelChildren={"Filter by " + (titleForFilterBy ?? "")}
            buttonChildren={filtered.value}
        />
    );

    return (
        <>
            <Head title={title} />
            <h1>{heading}</h1>
            <Search />
            <div className="w-full flex justify-end items-end gap-4 flex-wrap">
                {restFilter}
                {renderFilter}
                {renderSort}
                {renderSortOrderBtn}
            </div>

            {children}
            <Paginator paginated={paginationData} />
        </>
    );
};

export default FilterLayout;
