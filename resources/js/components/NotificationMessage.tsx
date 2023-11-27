const NotificationMessage = ({ message }: { message: string }) => {
    return (
        <div className="secondary-text">
            <h3>Notification</h3>
            <div>{message}</div>
        </div>
    );
};

export default NotificationMessage;
