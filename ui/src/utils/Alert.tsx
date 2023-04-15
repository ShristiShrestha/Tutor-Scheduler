import {NotificationPlacement} from "antd/lib/notification/interface";
import {notification} from "antd";
import _ from "lodash";

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

    let desc = description;
    const other_desc = _.get(description, "response.data.message", undefined)
        || _.get(description, "response.data", undefined);
    if (type === AlertType.ERROR && other_desc) {
        desc = other_desc;
    }
    return notification.open({
        message: title,
        description: desc,
        type,
        placement,
    });
};
