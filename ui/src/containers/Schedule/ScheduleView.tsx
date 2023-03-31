import React from "react";

import styled from "styled-components";
import { useParams } from "react-router";
import {
    ResText10Regular,
    ResText12Regular,
    ResText14Regular,
    ResText14SemiBold,
} from "../../utils/TextUtils";
import { amethyst, grey6, pearl } from "../../utils/ShadesUtils";
import { Avatar, Menu, Tag } from "antd";
import { Link } from "react-router-dom";
import { StatusTagList } from "../../components/Card/ScheduleCard";
import { expertises } from "../../static_data/tutors";
import { CalendarOutlined } from "@ant-design/icons";
import MyCalendar from "../../components/MyCalendar/MyCalendar";

const Wrapper = styled.div``;

const Header = styled.div`
    padding: 12px 24px;
    border-bottom: 1px solid ${grey6};
    box-shadow: 0 24px #eaeaea;
`;

const Content = styled.div`
    padding: 24px;
    background: ${pearl};
    height: calc(100vh - 48px);
    overflow-y: auto;
    position: relative;
    padding-bottom: 120px;
`;

const ScheduleActorInfo = styled.div.attrs({
    className: "outer-shadow",
})`
    max-width: 720px;
    margin: auto;
    padding: 24px;
    border: 1px solid ${grey6};
    background: white;
    border-radius: 8px;
    column-gap: 24px;
    margin-bottom: 24px;

    .actor-info-content {
        margin-top: 12px;
    }

    .actor-profile-info {
        margin-left: 16px;
        row-gap: 2px;
        align-items: start;
    }
`;

const NeedsTutoring = styled.div.attrs({
    className: "vertical-start-flex outer-shadow",
})`
    max-width: 720px;
    margin: auto;
    padding: 24px;
    border: 1px solid ${grey6};
    background: white;
    border-radius: 8px;
    column-gap: 24px;
    margin-bottom: 24px;
    align-items: start;
    row-gap: 4px;
`;

const ScheduleDetailsTabs = styled.div`
    max-width: 720px;
    margin: auto;
    border: 1px solid ${grey6};
    background: white;
    border-radius: 8px;
    padding: 12px;

    .schedules-menu > .ant-menu-item {
        padding-top: 6px;
        padding-bottom: 6px;

        ::after {
            display: none;
        }
    }

    .schedules-menu > .ant-menu-item-active {
        border-bottom: 2px solid ${amethyst};
        border-radius: 0;
    }
`;

export default function ScheduleView() {
    const { id } = useParams();

    const menuItems = [
        {
            key: "schedule-view",
            link: "/schedules/" + id,
            title: "Schedule Details",
            icon: <CalendarOutlined />,
        },
        {
            key: "schedule-rating",
            link: "/schedules/" + id,
            title: "Rate Tutor",
            icon: <CalendarOutlined />,
        },
    ];

    const renderMenuComponent = () => {
        return (
            <div>
                Schedule details
                <MyCalendar />
            </div>
        );
    };

    return (
        <Wrapper>
            <Header>My Schedule 1</Header>
            <Content>
                <ScheduleActorInfo>
                    <ResText14SemiBold>Tutor Info</ResText14SemiBold>
                    <div className={"h-start-flex actor-info-content"}>
                        <Avatar shape="circle" size={64} />
                        <div
                            className={"vertical-start-flex actor-profile-info"}
                        >
                            <ResText14SemiBold>
                                Shristi Shrestha{" "}
                                <Link to={"/user/"}>
                                    <ResText12Regular>
                                        View profile
                                    </ResText12Regular>
                                </Link>
                            </ResText14SemiBold>
                            <ResText14Regular className={"text-grey3"}>
                                Joined in Jan 24, 2023
                            </ResText14Regular>
                        </div>
                    </div>
                </ScheduleActorInfo>
                <NeedsTutoring>
                    <ResText14SemiBold>Needs tutoring in</ResText14SemiBold>
                    <StatusTagList>
                        {expertises &&
                            expertises.map(expertise => (
                                <Tag>
                                    <ResText10Regular>
                                        {expertise}
                                    </ResText10Regular>
                                </Tag>
                            ))}
                    </StatusTagList>
                    <div style={{ marginTop: "1rem" }}>
                        <ResText12Regular className={"text-grey2"}>
                            Note -{" "}
                        </ResText12Regular>
                        <ResText12Regular>
                            I am looking for an easy and fun tutoring.
                        </ResText12Regular>
                    </div>
                </NeedsTutoring>
                <ScheduleDetailsTabs>
                    <Menu
                        mode={"horizontal"}
                        className={"schedules-menu"}
                        defaultSelectedKeys={[menuItems[0].key]}
                        defaultOpenKeys={[menuItems[0].key]}
                    >
                        {menuItems.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.link}>
                                    <ResText14Regular>
                                        {item.title}
                                    </ResText14Regular>
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                    {renderMenuComponent()}
                </ScheduleDetailsTabs>
            </Content>
        </Wrapper>
    );
}