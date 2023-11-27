import { Fragment, PropsWithChildren } from "react";
import { Transition as HeadlessUiTransition } from "@headlessui/react";

const FormTransition = ({
    children,
    show,
}: PropsWithChildren & { show?: boolean }) => {
    return (
        <HeadlessUiTransition
            show={show}
            enter="transition-transform duration-300 ease-out"
            enterFrom="transform translate-x-full opacity-0"
            enterTo="transform translate-x-0 opacity-100"
            leave="transition-transform duration-300 ease-in"
            leaveFrom="transform translate-x-0 opacity-100"
            leaveTo="transform translate-x-full opacity-0"
            as={Fragment}
        >
            {children}
        </HeadlessUiTransition>
    );
};

export default FormTransition;
