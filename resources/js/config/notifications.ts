import { NotificationChannel, NotificationType } from "@/types/Notifications";

export const NOTIFICATION_TYPE: Readonly<{
    [key in string]: NotificationType;
}> = {
    BROADCAST_MESSAGE_TASK_ADDED: "broadcast.message.taskAdded",
};

export const NOTIFICATION_CHANNEL: Readonly<{
    [key in string]: NotificationChannel;
}> = {
    EMPLOYEES: "employees.",
};
