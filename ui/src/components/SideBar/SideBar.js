import React from "react";
import {
    CalendarOutlined,
    NotificationOutlined,
    SearchOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import "./SideBar.scss";
import { ResText14Regular } from "../../utils/TextUtils";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/reducer";
import { UserRoles } from "../../enum/UserEnum";
import { selectAppointment } from "../../redux/appointment/reducer";
import { isLoggedModerator } from "../../utils/AuthUtils";

const getMenus = numNotifications => [
    {
        key: "menu-my-schedule",
        icon: <CalendarOutlined />,
        link: "/schedules",
        title: "My Schedule",
    },
    {
        key: "menu-find-tutors",
        icon: <SearchOutlined />,
        link: "/find-tutors",
        title: "Find Tutors",
    },
    {
        key: "menu-chat",
        icon: <SendOutlined />,
        link: "/chat",
        title: "Chat",
    },
    {
        key: "menu-notifications",
        icon: <NotificationOutlined />,
        link: "/notifications",
        title:
            "Notifications " +
            (numNotifications > 0 ? `(${numNotifications})` : ""),
    },
];
const SideBar = () => {
    const location = useLocation();

    /******************* use selectors ************************/
    const { loggedUser } = useSelector(selectAuth);
    const { notifications } = useSelector(selectAppointment);

    /******************* local variables ************************/
    const unSeenPendingNotifications = notifications.filter(
        item =>
            item.clientReceivedAt === undefined ||
            item.clientReceivedAt === null,
    ).length;

    /******************* render children ************************/

    const getMenuItems = () => {
        const menus = getMenus(unSeenPendingNotifications);
        const roles = loggedUser.roles.map(item => item.name);
        if (roles.includes(UserRoles.STUDENT))
            return [menus[0], menus[1], menus[2]];
        if (roles.includes(UserRoles.TUTOR))
            return [menus[0], menus[1], menus[2], menus[3]];
        if (roles.includes(UserRoles.MODERATOR)) return [menus[1], menus[2]];
        return menus;
    };

    const getDefaultMenu = () => {
        const menuItems = getMenuItems();
        const defaultPath = isLoggedModerator(loggedUser)
            ? "/find-tutors"
            : "/schedules";
        const pathname = location ? location.pathname : defaultPath;
        if (!!menuItems) {
            const defaultOpenTabs = menuItems.filter(item =>
                pathname.includes(item["link"]),
            );
            if (defaultOpenTabs.length > 0) {
                return defaultOpenTabs.map(item => item["key"]);
            }
            return [menuItems[0].key];
        }
        return [""];
    };

    const sideMenus = getMenuItems();
    const defaultSelectedMenu = getDefaultMenu();
    return (
        <Menu
            className={"app-sidebar-menu"}
            mode="inline"
            defaultSelectedKeys={[defaultSelectedMenu[0]]}
            defaultOpenKeys={[defaultSelectedMenu[0]]}
        >
            {sideMenus.map(item => (
                <Menu.Item
                    key={item.key}
                    icon={
                        <div className={"h-start-flex"}>
                            {item.title.includes("(") ? (
                                <div
                                    className={"new-unseen"}
                                    style={{ marginRight: 8 }}
                                />
                            ) : (
                                ""
                            )}{" "}
                            {item.icon}
                        </div>
                    }
                >
                    <Link to={item.link}>
                        <ResText14Regular>{item.title}</ResText14Regular>
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};
export default SideBar;
