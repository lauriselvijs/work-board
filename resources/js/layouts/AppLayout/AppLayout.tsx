import { PropsWithChildren, useEffect } from "react";
import Button from "@/components/Button";
import EmployeeProfileMenu from "./partials/EmployeeProfileMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import NotificationMessage from "@/components/NotificationMessage";

const NotificationCloseBtn = () => {
    return (
        <Button btnType="secondary-trans" aria-label="Close notification">
            <XMarkIcon className="w-5 h-5 " aria-hidden="true" />
        </Button>
    );
};

const AppLayout = ({ children }: PropsWithChildren) => {
    const { flash, auth } = usePage<PageProps>().props;

    useEffect(() => {
        return router.on("exception", (event) => {
            toast(
                <NotificationMessage message={event.detail.exception.message} />
            );
        });
    }, []);

    if (flash.message) {
        toast(<NotificationMessage message={flash.message} />);
    }

    const renderEmployeeProfileMenu = auth?.employee && <EmployeeProfileMenu />;

    return (
        <>
            {renderEmployeeProfileMenu}
            <ToastContainer
                position="top-center"
                progressClassName="!bg-primary-very-light"
                progressStyle={{ background: "initial" }}
                closeButton={<NotificationCloseBtn />}
                toastClassName="!bg-primary-dark/80 !backdrop-blur-sm !secondary-text"
            />
            {children}
        </>
    );
};

export default AppLayout;
