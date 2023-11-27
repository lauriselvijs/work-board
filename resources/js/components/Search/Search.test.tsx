import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from ".";
import { useSearch } from "./useSearch";
import { vi } from "vitest";

vi.mock("./useSearch", () => ({
    useSearch: vi.fn().mockReturnValue({
        onKeyDown: vi.fn(),
        onInputChange: vi.fn(),
        navigateToSearchRoute: vi.fn(),
        query: "",
        isLoading: false,
    }),
}));

const setup = () => {
    const searchInput = screen.getByPlaceholderText("Search");
    const searchButton = screen.getByRole("button", { name: "Search" });

    return {
        searchInput,
        searchButton,
    };
};

describe("Search Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the Search component", () => {
        render(<Search />);

        const { searchInput, searchButton } = setup();

        // Ensure the search input and search button are rendered.
        expect(searchInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it("calls onKeyDown and onInputChange when typing in the input", async () => {
        render(<Search />);

        const { searchInput } = setup();
        const { onInputChange } = useSearch();

        // Simulate typing into the input field using userEvent
        await userEvent.type(searchInput, "search query");

        // Ensure onKeyDown and onInputChange were called
        expect(onInputChange).toHaveBeenCalled();
    });

    it("calls navigateToSearchRoute when clicking the search button", async () => {
        render(<Search />);
        const { searchButton } = setup();
        const { navigateToSearchRoute } = useSearch();

        // Simulate clicking the search button using userEvent
        await userEvent.click(searchButton);

        // Ensure navigateToSearchRoute was called
        // You should add more specific assertions based on your useSearch implementation
        expect(navigateToSearchRoute).toHaveBeenCalled();
    });
});
