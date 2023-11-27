import { Link, InertiaLinkProps } from "@inertiajs/react";

/* config ref=_link.scss,_button.scss */
const linkTypeClasses = {
    primary: {
        default: "primary-link",
        active: "text-primary-dark",
    },
    "primary-semibold": {
        default: "primary-link-semibold",
        active: "text-primary-dark",
    },
    "primary-button": {
        default: "primary-btn",
        active: "bg-primary-very-dark",
    },
};

const NavLink = ({
    linkType = "primary",
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & {
    active?: boolean;
    linkType?: keyof typeof linkTypeClasses;
}) => {
    return (
        <Link
            {...props}
            className={`${linkTypeClasses[linkType].default} ${
                active && linkTypeClasses[linkType].active
            }  ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;
