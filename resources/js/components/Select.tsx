import {
    Listbox,
    ListboxButtonProps,
    ListboxLabelProps,
    ListboxOptionProps,
    ListboxOptionsProps,
    ListboxProps,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Transition from "./Transition";
import { ElementType, ReactNode } from "react";
import { Option } from "@/types/Components";

const Select = ({
    optionList,
    listbox,
    label: { className: labelClassName = "", ...labelProps } = {},
    button: { className: buttonClassName = "", ...buttonProps } = {},
    options: { className: optionsClassName = "", ...optionsProps } = {},
    optionClassName,
    buttonChildren,
    labelChildren,
}: {
    optionList: ListboxOptionProps<ElementType, Option>[];
    listbox?: ListboxProps<ElementType, Option, Option>;
    label?: ListboxLabelProps<ElementType>;
    button?: ListboxButtonProps<ElementType>;
    buttonChildren?: ReactNode;
    options?: ListboxOptionsProps<ElementType>;
    optionClassName?: string;
    labelChildren?: ReactNode;
}) => {
    const renderListBoxLabel = (
        <Listbox.Label
            className={`primary-input-label ${labelClassName}`}
            {...labelProps}
        >
            {labelChildren}
        </Listbox.Label>
    );

    const renderListBoxBtn = (
        <Listbox.Button
            {...buttonProps}
            className={`primary-btn text-start px-3 flex justify-between items-center relative ${buttonClassName}`}
        >
            {buttonChildren}
            <ChevronDownIcon
                className="w-5 h-5 text-light"
                aria-hidden="true"
            />
        </Listbox.Button>
    );

    // FIXME: Fix z index
    const renderListBoxOptions = (
        <Listbox.Options
            {...optionsProps}
            className={`z-10 rounded-md py-2 shadow-md mt-2 w-full absolute backdrop-blur-md bg-primary-light/50 overflow-auto max-h-48 ${optionsClassName}`}
        >
            {optionList.map((option) => (
                <Listbox.Option
                    key={option.value.id}
                    {...option}
                    className={`ui-active:bg-primary-dark ui-active:secondary-text px-6 py-1 primary-text cursor-pointer ui-selected:hidden ${optionClassName}`}
                >
                    {option.value.value}
                </Listbox.Option>
            ))}
        </Listbox.Options>
    );

    return (
        <Listbox {...listbox}>
            <div className="relative">
                <div className="flex flex-col items-start">
                    {renderListBoxLabel}
                    {renderListBoxBtn}
                </div>
                <Transition>{renderListBoxOptions}</Transition>
            </div>
        </Listbox>
    );
};

export default Select;
