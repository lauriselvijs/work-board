import { NOTIFICATION_CHANNEL } from "@/config/notifications";
import { PageProps } from "@/types";
import {
    Notification,
    NotificationChannel,
    NotificationType,
} from "@/types/Notifications";
import { TaskNotification } from "@/types/Task";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export const useNotificationBroadcast = <T = TaskNotification>(
    type: NotificationType,
    channel: NotificationChannel = NOTIFICATION_CHANNEL.EMPLOYEES
) => {
    const { auth } = usePage<PageProps>().props;
    const [notificationId, setNotificationId] = useState("");

    window.Echo.private(channel + auth.employee.id).notification(
        (notification: Notification<T>) => {
            if (notification.type === type) {
                setNotificationId(notification.id);
            }
        }
    );

    return notificationId;
};
