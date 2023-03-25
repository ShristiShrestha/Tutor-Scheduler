import React from "react";
import {CalendarOutlined, SearchOutlined, SendOutlined,} from "@ant-design/icons";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import "./SideBar.scss";
import {ResText14Regular} from "../../utils/TextUtils";

const menus = [
    {
        key: "menu-my-schedule",
        icon: <CalendarOutlined/>,
        link: "/my-schedule",
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
];

const SideBar = () => {
    return (
        <Menu
            className={"app-sidebar-menu"}
            mode="inline"
            defaultSelectedKeys={[menus[0].key]}
            defaultOpenKeys={[menus[0].key]}
        >
            {menus.map(item => (
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
