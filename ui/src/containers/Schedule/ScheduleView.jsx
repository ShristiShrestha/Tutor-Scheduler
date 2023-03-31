import React from "react";

import styled from "styled-components";
import {useParams} from "react-router";
import {
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
import {CalendarOutlined, StarOutlined} from "@ant-design/icons";
import MyButton from "../../components/Button/MyButton";

const Wrapper = styled.div``;

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
`;

const ScheduleActorInfo = styled.div.attrs({
    // className: "outer-shadow",
})`
  max-width: 720px;
  //margin: auto;
  padding: 24px;
    // border: 1px solid ${grey6};
  background: white;
  border-radius: 8px;
  column-gap: 24px;
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
  padding: 24px;
    // border: 1px solid ${grey6};
  //background: white;
  border-radius: 8px;
  column-gap: 24px;
  margin-bottom: 24px;
  align-items: start;
  row-gap: 4px;
`;

const ScheduleDetailsTabs = styled.div`
  //max-width: 720px;
  //margin: auto;
    // border: 1px solid ${grey6};
  //background: white;
  border-radius: 8px;
  //padding: 12px 0;

  .schedules-menu > .ant-menu-item {
    //padding-top: 6px;
    //padding-bottom: 6px;
    border-bottom: 1px solid ${grey6};
    min-width: 160px;
    //min-height: 50px;

    ::after {
      display: none;
    }
  }

  .schedules-menu > .ant-menu-item-active {
    border-bottom: 1px solid ${amethyst};
  }
`;

const TabContent = styled.div`
  padding: 24px;

  .rate-tutor-content {
    margin-top: 24px;
  }

  .rate-tutor-features {
    margin-top: 12px;
    row-gap: 6px;
  }

  .rate-tutor-options {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin-bottom: 48px;

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

const ratings = [
    {
        id: "very-bad",
        title: "Very bad",
        className: "rate-very-bad",
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/pouting_face.svg'}/>
    },
    {
        id: "bad",
        title: "Just bad",
        className: "rate-just-bad",
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/neutral_face.svg'}/>
    },
    {
        id: "good",
        title: "Good",
        className: "rate-good",
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/slightly_smiling.svg'}/>
    },
    {
        id: "very-good",
        title: "Very Good",
        className: "rate-very-good",
        icon: <img width={30} height={30}
                   src={process.env.PUBLIC_URL + '/grinning_face.svg'}/>
    }
]

export default function ScheduleView() {
    const {id} = useParams();
    const location = useLocation();

    const menuItems = [
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


    const getDefaultTab = () => {
        const pathname = location ? location.pathname : "/schedules/" + id;
        const defaultOpenTabs = menuItems.filter(item => item["link"] === pathname);
        if (defaultOpenTabs.length > 0) {
            return defaultOpenTabs.map(item => item["key"]);
        }
        return [menuItems[0].key];
    }


    //  ----------------- actor details -----------
    const renderActorInfo = () => <ScheduleActorInfo>
        <ResText16SemiBold>Tutor Info</ResText16SemiBold>
        <div className={"h-start-flex actor-info-content"}>
            <Avatar shape="circle" size={64}/>
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

    // ---------------- needs tutoring --------------
    const renderNeedsTutoring = () => <NeedsTutoring>
        <ResText16SemiBold>Needs tutoring in</ResText16SemiBold>
        <StatusTagList>
            {expertises &&
                expertises.map(expertise => (
                    <Tag style={{padding: "6px 12px"}}>
                        <ResText12Regular>
                            {expertise}
                        </ResText12Regular>
                    </Tag>
                ))}
        </StatusTagList>
        <div style={{marginTop: "1rem"}}>
            <ResText14Regular className={"text-grey2"}>
                Student Note -{" "}
            </ResText14Regular>
            <ResText14Regular>
                <i>"I am looking for an easy and fun tutoring."</i>
            </ResText14Regular>
        </div>
    </NeedsTutoring>

    // ---------------- schedule details and rate tutor --------------
    const renderMenuComponent = () => {
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
                                              style={{fontStyle: "normal", marginLeft: 12, fontWeight: "normal"}}>
                                {toMonthDateYearStr(today)}
                            </ResText16Regular>
                        </ResText16SemiBold>
                        <MyCalendar onClick={onClick}/>
                    </TabContent>
                );
        }
    };

    const renderTabs = () => {
        const defaultTab = getDefaultTab()[0];
        return <ScheduleDetailsTabs>
            <Menu
                mode={"horizontal"}
                className={"schedules-menu"}
                defaultSelectedKeys={defaultTab}
                defaultOpenKeys={defaultTab}
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
    }

    return (
        <Wrapper>
            <Header><ResText14SemiBold>Schedule Details</ResText14SemiBold></Header>
            <Content>
                <Row gutter={[24, 24]}>
                    <Col xxl={12} md={24}>
                        {renderTabs()}
                    </Col>
                    <Col xxl={12} md={24} className={"h-start-top-flex"}>
                        <Divider type={"vertical"} style={{height: "100%"}}/>
                        <div>
                            {renderActorInfo()}
                            {renderNeedsTutoring()}
                        </div>
                    </Col>
                </Row>
            </Content>
        </Wrapper>
    );
}