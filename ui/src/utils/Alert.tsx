import {NotificationPlacement} from "antd/lib/notification/interface";
import {notification} from "antd";

export const openNotification = (title, description, placement: NotificationPlacement = "topRight") => {
    notification.info({
        message: title,
        description: description,
        placement,
    });
};
