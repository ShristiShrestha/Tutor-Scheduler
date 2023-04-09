import {NotificationPlacement} from "antd/lib/notification/interface";
import {notification} from "antd";

export enum AlertType {
    INFO = "info",
    ERROR = "error",
    WARNING = "warning",
    SUCCESS = "success"
}

export const openNotification = (title, description,
                                 type: AlertType = AlertType.INFO,
                                 placement: NotificationPlacement = "topRight"
) => {
    notification.open({
        message: title,
        description: description,
        type,
        placement,
    });
};
