import { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { Menu } from "@headlessui/react";

import { Navigation } from "@/types/Components";
import { Link } from "@inertiajs/react";
import Transition from "./Transition";

type MouseOverBtnEvent = MouseEvent<HTMLButtonElement> & {
    target: { click: () => void; dataset: { headlessuiState: string } };
};

const Dropdown = ({
    options,
    button: {
        disabled: btnDisabled,
        className: btnClassName,
        ...btnProps
    } = {},
    buttonChildren,
}: {
    button?: ButtonHTMLAttributes<HTMLButtonElement>;
    options: Navigation[];
    buttonChildren: ReactNode;
}) => {
    const renderItems = (
        <Menu.Items className="right-[6%] flex flex-col absolute items-start ring-2 ring-primary-dark bg-light/40 backdrop-blur-sm rounded-md p-4 mt-10 whitespace-nowrap gap-2 overflow-y-auto max-h-72 z-10">
            {options.map(({ route, name, ...nav }) => {
                return (
                    <Menu.Item key={route}>
                        <Link className="primary-link" {...nav}>
                            {name}
                        </Link>
                    </Menu.Item>
                );
            })}
        </Menu.Items>
    );

    const onDropdownBtnClick = (event: MouseOverBtnEvent) => {
        if (!event.target.dataset.headlessuiState) {
            event.target.click();
        }
    };

    const renderBtn = (
        <Menu.Button
            onMouseOver={onDropdownBtnClick}
            {...btnProps}
            disabled={btnDisabled}
            className={`primary-link ${btnClassName} ui-open:font-semibold`}
        >
            {buttonChildren}
        </Menu.Button>
    );

    return (
        <div className="flex flex-col position-relative">
            <Menu>
                {renderBtn}
                <Transition>{renderItems}</Transition>
            </Menu>
        </div>
    );
};

export default Dropdown;
