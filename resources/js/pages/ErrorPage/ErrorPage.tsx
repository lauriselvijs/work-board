import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const ErrorPage = ({
    status,
}: PageProps<{
    status: number;
}>) => {
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <>
            <Head title={title} />
            <div className="block-base h-screen flex items-center justify-center">
                <div className="card primary-text flex flex-col gap-2">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
