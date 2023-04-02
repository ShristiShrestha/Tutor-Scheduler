import React from "react";

import styled from "styled-components";
import {useParams} from "react-router";
import {
    ResText10Regular,
    ResText12Regular,
    ResText14Regular,
    ResText14SemiBold,
    ResText16Regular,
    ResText16SemiBold,
} from "../../utils/TextUtils";
import {
    amethyst,
    crimson,
    green,
    grey1,
    grey2,
    grey3,
    grey5,
    grey6,
    lightRed,
    pearl,
    rose,
    seaFoam,
    snow
} from "../../utils/ShadesUtils";
import {Avatar, Col, Divider, Input, Menu, Row, Tag} from "antd";
import {Link, useLocation} from "react-router-dom";
import {StatusTagList} from "../../components/Card/ScheduleCard";
import {expertises} from "../../static_data/tutors";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import {toMonthDateYearStr} from "../../utils/DateUtils";
import MyButton from "../../components/Button/MyButton";
import {CalendarOutlined, StarOutlined} from "@ant-design/icons";

const Wrapper = styled.div`
  .ant-divider {
    margin: 0;
  }

  .ant-row {
    margin: 0 !important;
  }

  .ant-col {
    height: fit-content;
  }
`;

const Header = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid ${grey6};
  box-shadow: 0 24px #eaeaea;
`;

const Content = styled.div`
  //padding: 24px;
  background: white;
    // background: ${pearl};
  height: calc(100vh - 48px);
  overflow-y: auto;
  position: relative;
  padding-bottom: 120px;

  .border-right {
    border-right: 1px solid ${grey6};
  }
`;

export const ScheduleActorInfo = styled.div.attrs({
    // className: "outer-shadow",
})`
  //max-width: 720px;
  //margin: auto;
  width: 100%;
  padding: 24px 0 24px 24px;
    // border: 1px solid ${grey6};
  background: white;
  border-radius: 8px;
  //column-gap: 24px;
  //margin-bottom: 24px;

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
    // className: "vertical-start-flex outer-shadow",
})`
  //max-width: 720px;
  //margin: auto;
  width: 100%;
  margin-top: 16px;
  padding: 0 0 36px 24px;
    // border: 1px solid ${grey6};
  //background: white;
  border-radius: 8px;
  column-gap: 24px;
  align-items: start;
  row-gap: 4px;
`;

export const SlotInfo = styled.div`
  padding: 24px 0 24px 24px;

  .slot-items {
    list-style-type: none;
    padding: 0;

    li {
      display: flex;
      padding: 0;
      column-gap: 12px;

      .ant-checkbox {
        width: 25px;
        height: 25px;
      }
    }
  }

  .send-slot-request {
    column-gap: 20px !important;
    row-gap: 20px;

    .ant-btn {
      align-self: end;
    }
  }
`

const ScheduleDetailsTabs = styled.div`
  //max-width: 720px;
  //margin: auto;

  //background: white;
  border-radius: 8px;
  //padding: 12px 0;

  .ant-menu-horizontal {
    border-top: 1px solid ${grey6};
  }

  .schedules-menu > .ant-menu-item {
    padding-left: 36px;
    //padding-top: 6px;
    //padding-bottom: 6px;
    border-bottom: 1px solid ${grey6};
    min-width: 215px;
    //min-height: 50px;

    ::after {
      display: none;
    }
  }

  .schedule-menu-last-item {
    min-width: 160px !important;
    padding-left: 24px !important;
  }

  .schedules-menu > .ant-menu-item-active {
    border-bottom: 1px solid ${amethyst};
  }
`;

export const TabContent = styled.div`
  padding: 24px;

  .ant-picker-calendar-mode-switch {
    display: none;
  }

  .rate-tutor-content {
    margin-top: 24px;
  }

  .rate-tutor-features {
    row-gap: 6px;
  }

  .rate-tutor-options {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin-bottom: 24px;

    li {
      display: inline-flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      padding: 36px;
      max-height: 50px;
      max-width: 50px;
      background: white;
      border: 1px solid ${grey3};
      margin-right: 10px;
      border-radius: 4px;

      .anticon svg {
        font-size: 24px;
        color: ${grey2};
      }

      :hover {
        background: ${snow};
      }
    }
  }

  .rate-very-bad:hover {
    background: ${rose} !important;
    border: 1px solid ${rose} !important;
  }

  .rate-just-bad:hover {
    background: ${lightRed} !important;
    border: 1px solid ${crimson} !important;
  }

  .rate-good:hover {
    background: ${seaFoam} !important;
    border: 1px solid ${green} !important;
  }

  .rate-very-good:hover {
    background: ${green} !important;
    border: 1px solid ${green} !important;
  }

  .rate-tutor-comment {
    margin-top: 12px;
    margin-bottom: 12px;
    row-gap: 20px;
  }

  .rate-tutor-input {
    border: 1px solid ${grey5};
    min-height: 50px;
    font-style: normal;
  }
`;

export const ratings = [
    {
        id: "very-bad",
        title: "Very bad",
        className: "rate-very-bad",
        totalUsers: 10,
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/pouting_face.svg'}/>
    },
    {
        id: "bad",
        title: "Just bad",
        className: "rate-just-bad",
        totalUsers: 1,
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/neutral_face.svg'}/>
    },
    {
        id: "good",
        title: "Good",
        className: "rate-good",
        totalUsers: 100,
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/slightly_smiling.svg'}/>
    },
    {
        id: "very-good",
        title: "Very Good",
        className: "rate-very-good",
        totalUsers: 1000,
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/grinning_face.svg'}/>
    }
]

const getMenuItems = (id) => [
    {
        key: "schedule-view",
        link: "/schedules/" + id,
        title: "Schedule Details",
        icon: <CalendarOutlined/>,
    },
    {
        key: "schedule-rating",
        link: "/schedules/" + id + "/rate-tutor",
        title: "Rate Tutor",
        icon: <StarOutlined/>,
    },
];

//  ----------------- actor details -----------
export const renderActorInfo = (title = "Tutor info") => <ScheduleActorInfo>
    <ResText16SemiBold>{title}</ResText16SemiBold>
    <div className={"h-start-flex actor-info-content"}>
        <Avatar shape="circle" size={64}/>
        <div className={"vertical-start-flex actor-profile-info"}>
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

// ---------------- needs tutoring --------------
export const renderNeedsTutoring = (title = "Needs tutoring in", noteTitle = "Student Note - ") => <NeedsTutoring>
    <ResText16SemiBold>{title}</ResText16SemiBold>
    <StatusTagList>
        {expertises &&
            expertises.map(expertise => (
                <Tag style={{padding: "3px 10px"}}>
                    <ResText10Regular>
                        {expertise}
                    </ResText10Regular>
                </Tag>
            ))}
    </StatusTagList>
    <div style={{marginTop: "1rem"}}>
        <ResText14Regular className={"text-grey2"}>
            {noteTitle}
        </ResText14Regular>
        <ResText14Regular>
            <i>"I am looking for an easy and fun tutoring."</i>
        </ResText14Regular>
    </div>
</NeedsTutoring>

export const renderTabs = (defaultTab, renderMenuComponent, menuItems) => {
    return <ScheduleDetailsTabs>
        <Menu
            mode={"horizontal"}
            className={"schedules-menu"}
            defaultSelectedKeys={defaultTab}
            defaultOpenKeys={defaultTab}
        >
            {menuItems.map((item, index) => (
                <Menu.Item key={item.key} icon={item.icon}
                           className={index === menuItems.length - 1 ? "schedule-menu-last-item" : ""}>
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
}
export default function ScheduleView() {
    const {id} = useParams();
    const location = useLocation();


    const getDefaultTab = () => {
        const menuItems = getMenuItems(id)
        const pathname = location ? location.pathname : "/schedules/" + id;
        if (!!menuItems) {
            const defaultOpenTabs = menuItems.filter(item => item["link"] === pathname);
            if (defaultOpenTabs.length > 0) {
                return defaultOpenTabs.map(item => item["key"]);
            }
            return [menuItems[0].key];
        }
        return ""
    }

    const renderSlotView = () => <SlotInfo>
        <ResText16Regular className={"text-grey2"}>Showing slots for
            <b style={{marginLeft: 8, color: grey1}}>{`${toMonthDateYearStr(new Date())}`}</b>
        </ResText16Regular>
    </SlotInfo>

    // ---------------- schedule details and rate tutor --------------
    const renderMenuComponent = (menuItems = getMenuItems(id)) => {
        const defaultTab = getDefaultTab()[0];
        const today = new Date();
        switch (defaultTab) {
            case menuItems[1].key:
                return <TabContent>
                    <ResText16SemiBold>
                        Rate Tutor
                    </ResText16SemiBold>

                    <div className={"rate-tutor-content"}>
                        <div className={"rate-tutor-features h-start-top-flex"}>
                            <ResText16Regular className={"text-grey2"}>Tutoring skill</ResText16Regular>
                            <ul className={"rate-tutor-options"}>
                                {ratings.map(item => <li className={item.className}>{item.icon}</li>)}
                            </ul>
                        </div>
                        <div className={"rate-tutor-comment h-start-flex"}>
                            <ResText16Regular className={"text-grey2"}>Add comment (Optional)</ResText16Regular>
                            <Input rootClassName={"rate-tutor-input"} size={"large"} bordered/>
                        </div>

                        <div className={"h-end-flex"}>
                            <MyButton type={"primary"}>
                                <ResText14Regular>Submit your ratings</ResText14Regular>
                            </MyButton>
                        </div>
                    </div>
                </TabContent>
            default:
                const onClick = (date) => alert("hello, " + toMonthDateYearStr(new Date(date)));
                return (
                    <TabContent>
                        <ResText16SemiBold><b>Today</b>
                            <ResText16Regular className={"text-grey"}
                                              style={{marginLeft: 12}}>
                                {toMonthDateYearStr(today)}
                            </ResText16Regular>
                        </ResText16SemiBold>
                        <MyCalendar onClick={onClick}/>
                    </TabContent>
                );
        }
    };


    return (
        <Wrapper>
            <Header><ResText14SemiBold>Schedule Details</ResText14SemiBold></Header>
            <Content>
                <Row gutter={[24, 24]}>
                    <Col xxl={16} md={24} className={"border-right no-padding"}>
                        {renderTabs(getDefaultTab(), () => renderMenuComponent(), getMenuItems(id))}
                    </Col>
                    <Col xxl={8} md={24} className={"h-start-top-flex no-padding"}>
                        {renderActorInfo()}
                        {renderNeedsTutoring()}
                        <Divider type={"horizontal"}/>
                        {renderSlotView()}
                    </Col>
                </Row>
            </Content>
        </Wrapper>
    );
}