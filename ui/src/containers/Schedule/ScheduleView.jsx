import React, {useCallback, useEffect, useState} from "react";

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
import {Avatar, Badge, Checkbox, Col, Menu, Modal, Row, Spin, Tag} from "antd";
import {Link, useLocation} from "react-router-dom";
import {getStatusBox, StatusTagList} from "../../components/Card/ScheduleCard";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import {toMonthDateYearStr} from "../../utils/DateUtils";
import MyButton from "../../components/Button/MyButton";
import {CalendarOutlined, StarOutlined} from "@ant-design/icons";
import {UserDetailsType} from "../../redux/user/types";
import {getScheduledSlots, getUsername, ratings} from "../../utils/ScheduleUtils";
import {fetchAppointment, rateAppointment} from "../../redux/appointment/actions";
import {useDispatch, useSelector} from "react-redux";
import {selectAppointment} from "../../redux/appointment/reducer";
import {AlertType, openNotification} from "../../utils/Alert";
import {AppointmentStatus} from "../../enum/AppointmentEnum";
import {capitalize} from "../../utils/StringUtils";
import {isLoggedModerator, isLoggedStudent, isLoggedTutor} from "../../utils/AuthUtils";
import {selectAuth} from "../../redux/auth/reducer";

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

  .border-top {
    border-top: 1px solid ${grey6};
  }

  .schedule-actor-view-mod {
    column-gap: 36px;
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

  .selected-slots-info {
    align-items: start;
    row-gap: 12px;
  }

  .slot-items {
    list-style-type: none;
    padding: 0;

    li {
      display: flex;
      padding: 0;
      column-gap: 12px;
      margin-bottom: 8px;
    }
  }

  .send-slot-request {
    max-width: 95%;
    text-align: justify;
    column-gap: 20px !important;
    row-gap: 20px;

    .ant-btn {
      align-self: end;
    }
  }

  .select-needs-tutoring-in {
    row-gap: 12px;
    align-items: start;
    margin: 32px 0;
  }

  .tutoring-notes {
    row-gap: 12px;
    align-items: start;
    margin: 32px 0;

    .ant-input {
      font-style: normal;
      width: 95%;
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

  .schedule-menu-header {
    width: 100%;
    border-bottom: 1px solid ${grey6};
    row-gap: 12px;
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
    border-bottom: 2px solid ${amethyst} !important;
  }

  .schedules-menu > .ant-menu-item-selected {
    border-bottom: 2px solid ${amethyst} !important;
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
      column-gap: 4px;

      .anticon svg {
        font-size: 24px;
        color: ${grey2};
      }

      :hover {
        background: ${snow};
      }
    }
  }

  .rate-options-disabled {
    cursor: not-allowed;
  }

  .margin-btm-icon {
    max-width: 70px !important;
    max-height: 85px !important;
  }

  .margin-btm-icon > img {
    margin-bottom: 6px;
  }

  .rate-very-bad-selected {
    background: ${rose} !important;
    border: 1px solid ${rose} !important;
  }

  .rate-very-bad:hover {
    background: ${rose} !important;
    border: 1px solid ${rose} !important;
  }

  .rate-just-bad-selected {
    background: ${lightRed} !important;
    border: 1px solid ${crimson} !important;
  }

  .rate-just-bad:hover {
    background: ${lightRed} !important;
    border: 1px solid ${crimson} !important;
  }

  .rate-good-selected {
    background: ${seaFoam} !important;
    border: 1px solid ${green} !important;
  }

  .rate-good:hover {
    background: ${seaFoam} !important;
    border: 1px solid ${green} !important;
  }

  .rate-very-good-selected {
    background: ${green} !important;
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

export const CalenderItem = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 20px;
`;

//  ----------------- actor details -----------
export const renderActorInfo = (user: UserDetailsType, title = "Tutor info") => <ScheduleActorInfo>
    <ResText14SemiBold>{title}</ResText14SemiBold>
    <div className={"h-start-flex actor-info-content"}>
        <Avatar shape="circle" size={64}/>
        <div className={"vertical-start-flex actor-profile-info"}>
            <ResText14SemiBold>
                {getUsername(user) + " "}
                <Link to={"/user/"}>
                    <ResText14Regular style={{marginLeft: 4}}>
                        View profile
                    </ResText14Regular>
                </Link>
            </ResText14SemiBold>
            {user && <ResText14Regular className={"text-grey2"}>
                {"Joined in " + toMonthDateYearStr(new Date(user.createdAt))}
            </ResText14Regular>}
        </div>
    </div>
</ScheduleActorInfo>

// ---------------- needs tutoring --------------
export const renderNeedsTutoring = (subjects: string[],
                                    studentNote ?: string,
                                    title = "Needs tutoring in",
                                    noteTitle = "Student Note - ",
) =>
    <NeedsTutoring>
        <ResText14SemiBold>{title}</ResText14SemiBold>
        <StatusTagList>
            {subjects &&
                subjects.map(expertise => (
                    <Tag style={{padding: "3px 10px"}}>
                        <ResText12Regular>
                            {expertise}
                        </ResText12Regular>
                    </Tag>
                ))}
        </StatusTagList>
        {studentNote && <div style={{marginTop: "2rem"}}>
            <ResText14Regular className={"text-grey2"}>
                {noteTitle}
            </ResText14Regular>
            <ResText14Regular>
                <i>"{studentNote}"</i>
            </ResText14Regular>
        </div>}
    </NeedsTutoring>

export const renderTabs = (defaultTab, renderMenuComponent, menuItems, status?: string) => {
    return <ScheduleDetailsTabs>
        <div className={"h-justified-flex schedule-menu-header"}>
            <Menu
                mode={"horizontal"}
                style={{width: "55%"}}
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
            {!!status && <div
                style={{alignSelf: "center", display: "flex", columnGap: 12}}>
                <i className={"text-grey3"}>Status</i>
                {getStatusBox(status, <ResText12Regular>{capitalize(status)}
                </ResText12Regular>)}
            </div>}
        </div>
        {renderMenuComponent()}
    </ScheduleDetailsTabs>
}
export default function ScheduleView() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const {appointment} = useSelector(selectAppointment);
    const [scheduledSlots, setScheduledSlots] = useState([]);
    const [rateRequest, setRateRequest] = useState({rating: undefined, comment: undefined});
    const acceptedApt = appointment && appointment.status === AppointmentStatus.ACCEPTED;
    const ratingOptions = Object.values(ratings);
    const {loggedUser} = useSelector(selectAuth);
    const isTutor = isLoggedTutor(loggedUser) && appointment && appointment.tutorId === loggedUser?.id;
    const isStudent = isLoggedStudent(loggedUser) && appointment && appointment.studentId === loggedUser?.id;

    /******************* dispatches ************************/
    const dispatchFetchApt = useCallback(() => {
        dispatch(fetchAppointment(id));
        setLoading(false);
    }, [fetchAppointment]);

    const dispatchRateTutor = useCallback(() => {
        const handleErr = (err) => openNotification("Unsuccessful request",
            "Failed to rate the tutor." + err, AlertType.ERROR)

        if (!!rateRequest.rating)
            dispatch(rateAppointment(id, rateRequest.rating, handleErr));
        else
            openNotification("Invalid rating", "Please select one of the ratings.")
    }, [])

    /******************* use effects ************************/
    useEffect(() => {
        dispatchFetchApt();
    }, [dispatchFetchApt])

    useEffect(() => {
        if (appointment)
            fetchScheduledSlots();
    }, [appointment]);

    /******************* local variables ************************/

    const fetchScheduledSlots = () => {
        const slots = getScheduledSlots(new Date(appointment.scheduledAt));
        setScheduledSlots(slots);
    }

    const handleRateChanges = (key, value) => {
        setRateRequest({...rateRequest, [key]: value});
        console.log("rate request: ", rateRequest);
    }

    const getRoleBasedMenuItems = (id) => {
        const allMenuItems = getMenuItems(id);
        if (isStudent)
            return allMenuItems;
        return [allMenuItems[0]];
    }

    /******************* render children ************************/
    const getDefaultTab = () => {
        const allMenuItems = getRoleBasedMenuItems(id);
        const menuItems = isStudent ? allMenuItems : [allMenuItems[0]];
        if (isStudent) {
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
        return [menuItems[0].key];
    }

    const renderSlotView = () => <SlotInfo>
        <ResText16Regular className={"text-grey2"}>Appointment requested for
            <b style={{marginLeft: 8, color: grey1}}>{`${toMonthDateYearStr(new Date(appointment.scheduledAt))}`}</b>
        </ResText16Regular>

        <ul className={"slot-items"}>
            {scheduledSlots.map((item, index) => (
                <li key={`scheduled-slot-apt-${index}`}>
                    <Checkbox
                        checked={!item.available}
                        disabled={item.available}/>
                    <ResText14Regular>{item.title}</ResText14Regular>
                </li>
            ))}
        </ul>
    </SlotInfo>

    // ---------------- schedule details and rate tutor --------------

    const renderMenuComponent = (menuItems = getRoleBasedMenuItems(id)) => {
        const defaultTab = getDefaultTab()[0];
        const today = new Date();

        if (menuItems.length > 1)
            switch (defaultTab) {
                case menuItems[1].key:
                    return <TabContent>
                        <ResText14Regular>
                            {acceptedApt ? "Rate Tutor" : "You can only rate the accepted appointment."}
                        </ResText14Regular>
                        <div className={"rate-tutor-content"}>
                            <div className={"rate-tutor-features h-start-top-flex"}>
                                <ResText14Regular className={"text-grey2"}>Tutoring skill</ResText14Regular>
                                <ul className={"rate-tutor-options"}>
                                    {ratingOptions.map((item, index) => <li
                                        key={"rate-tutor-options-" + item.id}
                                        onClick={() => handleRateChanges("rating", index + 1)}
                                        className={item.className + ((acceptedApt && (index + 1) === rateRequest.rating) ? "-selected" : "") + (!acceptedApt ? " rate-options-disabled" : "")}>{item.icon}</li>)}
                                </ul>
                            </div>
                            {/*<div className={"rate-tutor-comment h-start-flex"}>*/}
                            {/*    <ResText16Regular className={"text-grey2"}>Add comment (Optional)</ResText16Regular>*/}
                            {/*    <Input rootClassName={"rate-tutor-input"}*/}
                            {/*           onChange={e => handleRateChanges("comment", e.currentTarget.value)}*/}
                            {/*           size={"large"} bordered/>*/}
                            {/*</div>*/}
                            <div className={"h-start-flex"}>
                                <MyButton type={"primary"} disabled={appointment.status !== AppointmentStatus.ACCEPTED}
                                          onClick={() => dispatchRateTutor()}>
                                    <ResText14Regular>Submit your ratings</ResText14Regular>
                                </MyButton>
                            </div>
                        </div>
                    </TabContent>
            }

        const scheduledSlot = scheduledSlots.filter(item => !item.available);

        const dateCellRender = (date) => {
            if (appointment && scheduledSlot.length > 0) {
                const cellDate = new Date(date);
                const scheduledDate = new Date(appointment.scheduledAt);
                const cellMatchesScheduledDate = cellDate.getDate() === scheduledDate.getDate() &&
                    cellDate.getMonth() === scheduledDate.getMonth();
                if (cellMatchesScheduledDate)
                    return <CalenderItem className={"h-centered-flex"}>
                        <Badge status={"success"}
                               text={<ResText14Regular>{scheduledSlot[0].title}</ResText14Regular>}/>
                    </CalenderItem>
            }
            return <></>
        }

        return (
            <TabContent>
                <ResText16SemiBold><b>Today</b>
                    <ResText16Regular className={"text-grey"}
                                      style={{marginLeft: 12}}>
                        {toMonthDateYearStr(today)}
                    </ResText16Regular>
                </ResText16SemiBold>
                {appointment &&
                    <MyCalendar dateCellRender={dateCellRender}
                                value={new Date(appointment.scheduledAt)}/>}
            </TabContent>
        );
    };


    return (
        <Wrapper>
            <Header>
                <ResText14SemiBold>Schedule Details</ResText14SemiBold>
            </Header>
            <Spin spinning={loading}>
                <Content>
                    {appointment && <div>
                        <div className={"schedule-actor-view-mod h-justified-flex"}>
                            {renderActorInfo(isTutor ? appointment.student : appointment.tutor,
                                isTutor ? "Student Info" : "Tutor Info")}
                            {isLoggedModerator(loggedUser) ? renderActorInfo(appointment.student,
                                "Student Info") : <></>}
                        </div>
                        {renderNeedsTutoring(appointment.tutoringOnList, appointment.studentNote)}
                    </div>}
                    {appointment && <Row gutter={[24, 24]} className={"border-top"}>
                        <Col xxl={16} md={24} className={"border-right no-padding"}>
                            {renderTabs(getDefaultTab(),
                                () => renderMenuComponent(),
                                getRoleBasedMenuItems(id), appointment?.status?.toString())}
                        </Col>
                        {/*<Col xxl={8} md={24} className={"h-start-top-flex no-padding"}>*/}
                        {/*    {renderActorInfo(appointment.tutor)}*/}
                        {/*    {renderNeedsTutoring(appointment.tutoringOnList, appointment.studentNote)}*/}
                        {/*    <Divider type={"horizontal"}/>*/}
                        {/*    {renderSlotView()}*/}
                        {/*</Col>*/}
                    </Row>}
                </Content>
            </Spin>
            {isTutor && <Modal>

            </Modal>}
        </Wrapper>
    );
}