export type NotificationType = "broadcast.message.taskAdded";

export type Notification<T> = {
    id: string;
    type: NotificationType;
} & T;

export type NotificationChannel = "employees.";
