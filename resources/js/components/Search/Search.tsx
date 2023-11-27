import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import Button from "../Button";
import TextInput from "../TextInput";
import { useSearch } from "./useSearch";

const Search = () => {
    const {
        onKeyDown,
        onInputChange,
        navigateToSearchRoute,
        query,
        isLoading,
    } = useSearch();

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
            <TextInput
                onKeyDown={onKeyDown}
                value={query}
                onChange={onInputChange}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10"
                placeholder="Search"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="false"
                required
            />
            <Button
                disabled={isLoading}
                onClick={navigateToSearchRoute}
                btnType="primary-trans"
                className="absolute right-8 bottom-2.5 px-4 py-2 primary-link"
            >
                Search
            </Button>
        </div>
    );
};

export default Search;
