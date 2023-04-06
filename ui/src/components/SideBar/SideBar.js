import React from "react";
import {CalendarOutlined, NotificationOutlined, SearchOutlined, SendOutlined,} from "@ant-design/icons";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import "./SideBar.scss";
import {ResText14Regular} from "../../utils/TextUtils";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/auth/reducer";
import {UserRoles} from "../../enum/UserEnum";

const menus = [
    {
        key: "menu-my-schedule",
        icon: <CalendarOutlined/>,
        link: "/schedules",
        title: "My Schedule",
    },
    {
        key: "menu-find-tutors",
        icon: <SearchOutlined/>,
        link: "/find-tutors",
        title: "Find Tutors",
    },
    {
        key: "menu-chat",
        icon: <SendOutlined/>,
        link: "/chat",
        title: "Chat",
    },
    {
        key: "menu-notifications",
        icon: <NotificationOutlined/>,
        link: "/notifications",
        title: "Notifications",
    },
];
const SideBar = () => {
    const {loggedUser} = useSelector(selectAuth);
    const menuItems = () => {
        const roles = loggedUser.roles;

        if (UserRoles.STUDENT in roles)
            return [menus[0], menus[1], menus[3]]
        if (UserRoles.TUTOR in roles)
            return [menus[0], menus[2], menus[3]]
        if (UserRoles.MODERATOR in roles) return [menus[1], menus[2]];
        return menus;
    };

    const sideMenus = menuItems();

    return (
        <Menu
            className={"app-sidebar-menu"}
            mode="inline"
            defaultSelectedKeys={[sideMenus[0].key]}
            defaultOpenKeys={[sideMenus[0].key]}
        >
            {sideMenus.map(item => (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.link}>
                        <ResText14Regular>{item.title}</ResText14Regular>
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};
export default SideBar;
