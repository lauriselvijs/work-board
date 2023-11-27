import ToggleButton from "@/components/ToggleButton";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useToggleSettings } from "./useToggleSettings";

const ToggleSettings = () => {
    const {
        auth: {
            employee: { email_notification, push_notification },
        },
    } = usePage<PageProps>().props;

    const [
        disableEmailNotificationsButton,
        emailNotificationStatus,
        onEmailNotificationButtonToggle,
    ] = useToggleSettings(
        route("employee.toggleEmailNotifications"),
        email_notification
    );

    const [
        disablePushNotificationsButton,
        pushNotificationStatus,
        onPushNotificationButtonToggle,
    ] = useToggleSettings(
        route("employee.togglePushNotifications"),
        push_notification
    );

    return (
        <div className="self-center flex flex-col gap-6 justify-center items-center">
            <ToggleButton
                disabled={disableEmailNotificationsButton}
                label="Email Notifications"
                enabled={emailNotificationStatus}
                onChange={onEmailNotificationButtonToggle}
            />
            <ToggleButton
                label="Push Notifications"
                disabled={disablePushNotificationsButton}
                enabled={pushNotificationStatus}
                onChange={onPushNotificationButtonToggle}
            />
        </div>
    );
};

export default ToggleSettings;
