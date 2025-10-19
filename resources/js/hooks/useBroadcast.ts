import { NOTIFICATION_CHANNEL } from "@/config/notifications";
import { PageProps } from "@/types";
import { NotificationChannel, NotificationType } from "@/types/Notifications";
import { TaskNotification } from "@/types/Task";
import { usePage } from "@inertiajs/react";
import { useEchoNotification } from "@laravel/echo-react";
import { useState } from "react";

export const useNotificationBroadcast = <T = TaskNotification>(
    type: NotificationType,
    channel: NotificationChannel = NOTIFICATION_CHANNEL.EMPLOYEES
) => {
    const { auth } = usePage<PageProps>().props;
    const [notificationId, setNotificationId] = useState("");

    useEchoNotification<T>(
        channel + auth.employee.id,
        (notification) => {
            if (notification.type === type) {
                setNotificationId(notification.id);
            }
        },
        type
    );

    return notificationId;
};
