import { Fragment } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import NavLink from "@/components/NavLink";
import Dropdown from "@/components/Dropwdown";
import { Dialog, Transition } from "@headlessui/react";

import Button from "@/components/Button";
import { useEmployeeProfileMenu } from "./useEmployeeProfileMenu";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/components/ApplicationLogo";

const EmployeeProfileMenu = () => {
    const {
        navigation,
        employee,
        profileOptions,
        mobileMenuOpen,
        toggleMobileMenu,
    } = useEmployeeProfileMenu();

    const renderLinks = navigation.map(({ route: routeName, name, ...nav }) => (
        <NavLink
            linkType="primary-semibold"
            active={route().current(routeName)}
            key={name}
            {...nav}
        >
            {name}
        </NavLink>
    ));

    const renderProfileOptions = (
        <Dropdown options={profileOptions} buttonChildren={employee.name} />
    );

    const renderMobileMenu = (
        <>
            <Transition show={mobileMenuOpen} as={Fragment}>
                <Dialog
                    onClose={toggleMobileMenu}
                    className="relative z-50 block sm:hidden"
                >
                    <div
                        className="fixed inset-0 bg-primary/30 backdrop-blur-sm"
                        aria-hidden="true"
                    />
                    <div className="fixed top-0 right-0 flex min-w-[33%] h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="transition-transform duration-300 ease-out"
                            enterFrom="transform translate-x-full opacity-0"
                            enterTo="transform translate-x-0 opacity-100"
                            leave="transition-transform duration-300 ease-in"
                            leaveFrom="transform translate-x-0 opacity-100"
                            leaveTo="transform translate-x-full opacity-0"
                        >
                            <Dialog.Panel className="bg-primary-light pl-8 pr-4 py-4 flex flex-col items-end gap-4 w-full overflow-auto">
                                <Button
                                    btnType="primary-trans"
                                    aria-label="Close menu"
                                    onClick={toggleMobileMenu}
                                >
                                    <XMarkIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                </Button>
                                {renderLinks}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );

    const renderDesktopMenu = (
        <div className="gap-8 hidden sm:flex overflow-hidden">
            {renderLinks}
        </div>
    );

    const renderMenu = (
        <>
            {!mobileMenuOpen && renderDesktopMenu}
            <Button
                aria-label="Open menu"
                btnType="primary-trans"
                className="block sm:hidden"
                onClick={toggleMobileMenu}
            >
                <Bars3Icon className="w-5 h-5" aria-hidden="true" />
            </Button>
            {renderMobileMenu}
        </>
    );

    return (
        <header className="flex flex-row justify-between gap-8 relative">
            <Link href={route("dashboard")} aria-label="Home">
                <ApplicationLogo className="w-8 h-8" />
            </Link>
            <nav className="justify-between items-center flex-1 flex flex-row-reverse sm:flex-row overflow-hidden gap-12">
                {renderMenu}
                {renderProfileOptions}
            </nav>
        </header>
    );
};

export default EmployeeProfileMenu;
