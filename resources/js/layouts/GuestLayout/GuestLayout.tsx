import { PropsWithChildren } from "react";

import ApplicationLogo from "@/components/ApplicationLogo";
import { Link } from "@inertiajs/react";

const GuestLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 flex-1 min-h-screen">
            <div>
                <Link href={route("dashboard")} aria-label="Home">
                    <ApplicationLogo className="w-20 h-20" />
                </Link>
            </div>

            <div className="card w-full sm:max-w-lg mt-6">{children}</div>
        </main>
    );
};

export default GuestLayout;
