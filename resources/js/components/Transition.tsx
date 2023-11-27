import { Fragment, PropsWithChildren } from "react";
import { Transition as HeadlessUiTransition } from "@headlessui/react";

const Transition = ({
    children,
    show,
}: PropsWithChildren & { show?: boolean }) => {
    return (
        <HeadlessUiTransition
            show={show}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-5 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            {children}
        </HeadlessUiTransition>
    );
};

export default Transition;
