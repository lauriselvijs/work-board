import { Link } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import NavLink from "@/components/NavLink";
import { Paginated } from "@/types/Components";

// TODO:
// [ ] - Add hook for logic
const Paginator = ({
    paginated: { from, to, total, prev_page_url, next_page_url, links },
}: {
    paginated: Paginated;
}) => {
    const renderLinks = links
        .slice(1, -1)
        .map(({ active, url, label }, index) => (
            <NavLink
                className={
                    active
                        ? "lg:border-2 lg:border-primary-dark p-2"
                        : url
                        ? "hidden lg:block"
                        : "hidden lg:block pointer-events-none"
                }
                key={index}
                href={url}
                aria-current={active && "page"}
            >
                {label}
            </NavLink>
        ));

    if (total === 0) {
        return null;
    }

    return (
        <div className="flex flex-col justify-center w-full items-center primary-text flex-wrap gap-4">
            <div>
                <p>
                    Showing <span className="font-medium">{from}</span> to{" "}
                    <span className="font-medium">{to}</span> of{" "}
                    <span className="font-medium">{total}</span> results
                </p>
            </div>
            <nav className="flex items-center gap-8" aria-label="Paginator">
                {prev_page_url && (
                    <Link
                        aria-label="Previous"
                        href={prev_page_url}
                        className="secondary-btn p-2"
                    >
                        <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Link>
                )}
                {renderLinks}
                {next_page_url && (
                    <Link
                        aria-label="Next"
                        href={next_page_url}
                        className="secondary-btn p-2"
                    >
                        <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default Paginator;
