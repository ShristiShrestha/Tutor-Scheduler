import React, { ReactNode, useCallback, useEffect, useState } from "react";

import styled from "styled-components";
import { useParams } from "react-router";
import {
    ResText12Regular,
    ResText12SemiBold,
    ResText14Regular,
    ResText14SemiBold,
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
    orange,
    parakeet,
    pearl,
    rose,
    seaFoam,
    snow,
} from "../../utils/ShadesUtils";
import {
    Avatar,
    Badge,
    Checkbox,
    Col,
    Divider,
    Menu,
    Row,
    Spin,
    Tag,
    Tooltip,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    getStatusBox,
    StatusTagList,
} from "../../components/Card/ScheduleCard";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import {
    getYearMonthDateHrsUtcFormat,
    toHourMinStr,
    toMonthDateStr,
    toMonthDateYearStr,
    toSlotRangeStr,
} from "../../utils/DateUtils";
import MyButton from "../../components/Button/MyButton";
import {
    CalendarOutlined,
    CheckCircleFilled,
    InfoCircleOutlined,
    ShareAltOutlined,
    StarFilled,
    StarOutlined,
} from "@ant-design/icons";
import { UserAppointmentParams, UserDetailsType } from "../../redux/user/types";
import {
    calendarIntToMonth,
    disabledScheduledSlot,
    getAvailableSlot,
    getScheduledSlots,
    getUsername,
    ratings,
} from "../../utils/ScheduleUtils";
import {
    fetchAppointment,
    rateAppointment,
    updateAppointment,
} from "../../redux/appointment/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAppointment } from "../../redux/appointment/reducer";
import { AlertType, openNotification } from "../../utils/Alert";
import { AppointmentStatus } from "../../enum/AppointmentEnum";
import {
    isLoggedModerator,
    isLoggedStudent,
    isLoggedTutor,
} from "../../utils/AuthUtils";
import { selectAuth } from "../../redux/auth/reducer";
import { selectUser } from "../../redux/user/reducer";
import { fetchAptWithUser } from "../../redux/user/actions";
import RespondAction from "./RespondAction";
import EditProfile from "../Tutor/EditProfile";
import { EditProfileEnum } from "../../enum/EditProfileEnum";
import EmptyContent from "../../components/NoContent/EmptyContent";
import { CopyToClipboard } from "react-copy-to-clipboard/src";

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
    align-items: center;
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
        row-gap: 6px;
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
        //margin-top: 24px;
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
`;

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
        border-top: 1px solid ${grey6};
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
        margin-bottom: 28px;

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
            margin-bottom: 10px;
            border-radius: 4px;
            column-gap: 4px;
            row-gap: 4px;

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

    .rated-icon {
        font-size: 16px;
        margin-right: 8px;
    }

    .rated-icon-done {
        color: ${parakeet};
    }

    .rated-icon-not-allowed {
        color: ${orange};
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

const ResponseAppointment = styled.div`
    padding: 12px 24px;

    .respond-reject-input {
        margin: 12px 0;
    }

    .respond-submit {
        margin-top: 24px;
    }
`;

const getMenuItems = id => [
    {
        key: "schedule-view",
        link: "/schedules/" + id,
        title: "Schedule Details",
        icon: <CalendarOutlined />,
    },
    {
        key: "schedule-rating",
        link: "/schedules/" + id + "/rate-tutor",
        title: "Rate Tutor",
        icon: <StarOutlined />,
    },
];

export const CalenderItem = styled.div`
    height: 100%;
    width: 100%;
    padding-top: 20px;
`;

//  ----------------- actor details -----------
export const renderActorInfo = (
    user: UserDetailsType,
    title = "Tutor info",
    loggedUserId?: string,
    showEditProfile = false,
) => (
    <ScheduleActorInfo>
        <ResText14SemiBold>{title}</ResText14SemiBold>
        <div className={"h-start-flex actor-info-content"}>
            <Avatar
                shape="circle"
                size={64}
                src={<img src={process.env.PUBLIC_URL + "/avatar_male.jpg"} />}
            />
            <div className={"vertical-start-flex actor-profile-info"}>
                <ResText14SemiBold>
                    {getUsername(user) + " "}
                    {loggedUserId && loggedUserId === user?.id && (
                        <Tag style={{ marginLeft: 12 }}>Me</Tag>
                    )}
                    {showEditProfile && (
                        <EditProfile
                            className={"small-horizontal-margin"}
                            type={EditProfileEnum.NAME}
                        />
                    )}
                </ResText14SemiBold>
                {user && (
                    <ResText14Regular className={"text-grey2"}>
                        {"Joined in " +
                            toMonthDateYearStr(new Date(user.createdAt))}
                    </ResText14Regular>
                )}
                {user && user.isTutor && (
                    <div
                        className={"vertical-start-flex full-block text-grey1"}
                    >
                        <StarFilled style={{ color: orange, marginRight: 3 }} />{" "}
                        <ResText12Regular>{`${user.rating}`}</ResText12Regular>
                        <Divider
                            type={"vertical"}
                            style={{ marginLeft: 10, marginRight: 10 }}
                        />
                        <ResText12Regular>
                            {user.ratedBy}{" "}
                            {user.ratedBy > 1 ? "ratings" : "rating"}
                        </ResText12Regular>
                    </div>
                )}
            </div>
        </div>
    </ScheduleActorInfo>
);

// ---------------- needs tutoring --------------
export const renderNeedsTutoring = (
    subjects: string[],
    studentNote?: string,
    title = "Needs tutoring in",
    noteTitle = "Student Note - ",
    showEditProfile = false,
) => (
    <NeedsTutoring>
        <ResText14SemiBold>{title}</ResText14SemiBold>
        {showEditProfile && (
            <EditProfile
                className={"small-horizontal-margin"}
                type={EditProfileEnum.SPECIALIZATIONS}
            />
        )}
        <StatusTagList>
            {subjects &&
                subjects.map(expertise => (
                    <Tag style={{ padding: "3px 10px" }}>
                        <ResText12Regular>{expertise}</ResText12Regular>
                    </Tag>
                ))}
            {subjects && subjects.length < 1 && (
                <ResText14Regular className={"text-grey2"}>
                    <i>
                        {title === "Specializations"
                            ? "- No specific specialization mentioned."
                            : "- No specific course mentioned for tutoring."}
                    </i>
                </ResText14Regular>
            )}
        </StatusTagList>
        {studentNote && (
            <div style={{ marginTop: "2rem" }}>
                <ResText14Regular className={"text-grey2"}>
                    {noteTitle}
                </ResText14Regular>
                <ResText14Regular>
                    <i>"{studentNote}"</i>
                </ResText14Regular>
            </div>
        )}
    </NeedsTutoring>
);

export const renderTabs = (
    defaultTab,
    renderMenuComponent,
    menuItems,
    showRespond = false,
    renderStatus?: string,
    renderRespond?: ReactNode,
) => {
    return (
        <ScheduleDetailsTabs>
            <div className={"h-justified-flex schedule-menu-header"}>
                <Menu
                    mode={"horizontal"}
                    style={{ width: "50%" }}
                    className={"schedules-menu"}
                    defaultSelectedKeys={defaultTab}
                    defaultOpenKeys={defaultTab}
                >
                    {menuItems.map((item, index) => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            className={
                                index === menuItems.length - 1
                                    ? "schedule-menu-last-item"
                                    : ""
                            }
                        >
                            <Link to={item.link}>
                                <ResText14Regular>
                                    {item.title}
                                </ResText14Regular>
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
                {!!renderStatus && (
                    <div
                        style={{
                            alignSelf: "center",
                            alignItems: "center",
                            display: "flex",
                            columnGap: 12,
                        }}
                    >
                        {renderStatus}
                        {showRespond && !!renderRespond && renderRespond}
                    </div>
                )}
            </div>
            {renderMenuComponent()}
        </ScheduleDetailsTabs>
    );
};

export default function ScheduleView() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    /******************* use states ************************/
    const [loading, setLoading] = useState(true);
    const [scheduledSlots, setScheduledSlots] = useState([]);
    const [rateRequest, setRateRequest] = useState({ rating: -1, comment: "" });
    const [tutorUpdateReq, setTutorUpdateReq] = useState({
        scheduledAt: undefined,
    });
    // list of slots available for user to select
    const [availableSlots, setAvailableSlots] = useState([]);
    const [copiedVal, setCopiedVal] = useState({
        value: `http://localhost:3000/schedules/${id}`,
        copied: false,
    });

    console.log("location: ", location);

    /******************* use selectors ************************/
    const { loggedUser } = useSelector(selectAuth);
    const { appointment } = useSelector(selectAppointment);
    const { aptsWithUser } = useSelector(selectUser);

    /******************* local variables ************************/
    const ratingOptions = Object.values(ratings);
    const appointmentIsAccepted =
        appointment && appointment.status === AppointmentStatus.ACCEPTED;
    const isTutor =
        isLoggedTutor(loggedUser) &&
        appointment &&
        appointment.tutorId === loggedUser?.id;
    const isStudent =
        isLoggedStudent(loggedUser) &&
        appointment &&
        appointment.studentId === loggedUser?.id;
    const isModerator = isLoggedModerator(loggedUser);
    const loggedUserIsAllowedToView = isModerator || isStudent || isTutor;

    /******************* dispatches ************************/

    const dispatchFetchApt = useCallback(() => {
        dispatch(fetchAppointment(id));
        setLoading(false);
    }, [id]);

    // we are viewing apt scheduled for the tutorId
    // fetch the tutor info and and all apointments
    // created requested for that tutor
    const dispatchFetchAptsWithUser = useCallback(() => {
        const today =
            tutorUpdateReq.scheduledAt || new Date(appointment.scheduledAt);
        const params: UserAppointmentParams = {
            status: AppointmentStatus.ACCEPTED,
            year: `${today.getUTCFullYear()}`, // backend stores date in UTC format
            month: calendarIntToMonth[today.getUTCMonth()], // // backend stores date in UTC format
        };
        dispatch(fetchAptWithUser(appointment.tutorId, params));
    }, [appointment]);

    const dispatchRateTutor = useCallback(() => {
        const handleSuccess = res =>
            openNotification(
                "Rate tutor success",
                "Tutor has been rated to " + rateRequest.rating,
                AlertType.SUCCESS,
            );
        const handleErr = err =>
            openNotification("Failed to rate the tutor.", err, AlertType.ERROR);

        if (rateRequest.rating > 0)
            dispatch(
                rateAppointment(
                    id,
                    rateRequest.rating,
                    handleSuccess,
                    handleErr,
                ),
            );
        else
            openNotification(
                "Invalid rating",
                "Please select one of the ratings.",
                AlertType.WARNING,
            );
    }, [rateRequest]);

    const dispatchUpdateAptSchedule = () => {
        const req = {
            id: appointment.id,
            scheduledAt: getYearMonthDateHrsUtcFormat(
                tutorUpdateReq.scheduledAt,
            ),
        };
        const onSuccess = apt => {
            openNotification(
                "Request successful",
                "Appointment schedule updated to " + new Date(apt.scheduledAt),
                AlertType.SUCCESS,
            );
        };

        const onError = err =>
            openNotification(
                "Failed to update appointment schedule to " +
                    tutorUpdateReq.scheduledAt,
                err,
                AlertType.ERROR,
            );
        dispatch(updateAppointment(req, onSuccess, onError));
    };

    /******************* use effects ************************/
    useEffect(() => {
        dispatchFetchApt();
    }, [id]);

    useEffect(() => {
        if (appointment && loggedUserIsAllowedToView) {
            dispatchFetchAptsWithUser();
        }
    }, [appointment, loggedUserIsAllowedToView]);

    useEffect(() => {
        if (appointment && loggedUserIsAllowedToView) fetchScheduledSlots();
    }, [appointment, loggedUserIsAllowedToView]);

    useEffect(() => {
        if (appointment && loggedUserIsAllowedToView) {
            getAvailableSlotsFromAcceptedApts();
        }
    }, [appointment, tutorUpdateReq.scheduledAt, loggedUserIsAllowedToView]);

    useEffect(() => {
        if (
            appointment &&
            !tutorUpdateReq.scheduledAt &&
            loggedUserIsAllowedToView
        ) {
            setTutorUpdateReq({
                ...tutorUpdateReq,
                scheduledAt: new Date(appointment.scheduledAt),
            });
        }
    }, [appointment, loggedUserIsAllowedToView]);

    /******************* local variables ************************/

    const getAvailableSlotsFromAcceptedApts = () => {
        const findAvailableSlotsFor =
            tutorUpdateReq.scheduledAt || new Date(appointment.scheduledAt);
        const slots = getAvailableSlot(
            findAvailableSlotsFor,
            aptsWithUser,
            loggedUser?.id,
        );
        setAvailableSlots(slots);
    };

    const fetchScheduledSlots = () => {
        const slots = getScheduledSlots(new Date(appointment.scheduledAt));
        setScheduledSlots(slots);
    };

    const handleRateChanges = (key, value) => {
        setRateRequest({ ...rateRequest, [key]: value });
    };

    const handleTutorUpdateReq = (key, value) => {
        const selectedCalendarDate =
            tutorUpdateReq.scheduledAt || appointment.scheduledAt;
        if (key === "slotSelected") {
            const selectedDateTs = new Date(
                selectedCalendarDate.getFullYear(),
                selectedCalendarDate.getMonth(),
                selectedCalendarDate.getDate(),
                value.start,
            );
            setTutorUpdateReq({
                ...tutorUpdateReq,
                scheduledAt: selectedDateTs,
            });
        } else {
            setTutorUpdateReq({ ...tutorUpdateReq, [key]: value });
        }
    };

    const getScheduledSlot = () =>
        scheduledSlots.filter(item => !item.available);

    const getRoleBasedMenuItems = id => {
        const allMenuItems = getMenuItems(id);
        if (isStudent) return allMenuItems;
        return [allMenuItems[0]];
    };

    /******************* render children ************************/
    const getDefaultTab = () => {
        const allMenuItems = getRoleBasedMenuItems(id);
        const menuItems = isStudent ? allMenuItems : [allMenuItems[0]];
        if (isStudent) {
            const pathname = location ? location.pathname : "/schedules/" + id;
            if (!!menuItems) {
                const defaultOpenTabs = menuItems.filter(
                    item => item["link"] === pathname,
                );
                if (defaultOpenTabs.length > 0) {
                    return defaultOpenTabs.map(item => item["key"]);
                }
                return [menuItems[0].key];
            }
            return [""];
        }
        return [menuItems[0].key];
    };

    const renderSlotView = () => {
        const scheduledDate = new Date(appointment.scheduledAt);
        const showingSlotsForDate = tutorUpdateReq.scheduledAt || scheduledDate;

        const newSelectedSlot = item =>
            tutorUpdateReq.scheduledAt?.getHours() === item.start;

        const previouslySelectedSlot = item => {
            const scheduledDateMatchesSelectedDate =
                tutorUpdateReq.scheduledAt?.getMonth() ===
                    scheduledDate.getMonth() &&
                tutorUpdateReq.scheduledAt?.getDate() ===
                    scheduledDate.getDate();
            return (
                appointment &&
                scheduledDateMatchesSelectedDate &&
                scheduledDate.getHours() === item.start
            );
        };

        return (
            <SlotInfo>
                <ResText14Regular className={"text-grey2"}>
                    Change schedule time to
                    <b
                        style={{
                            marginLeft: 8,
                            color: grey1,
                        }}
                    >{`${toMonthDateYearStr(showingSlotsForDate)}`}</b>
                </ResText14Regular>

                <ResText14Regular
                    className={
                        "text-grey2 full-block text-italic medium-vertical-margin"
                    }
                >
                    <InfoCircleOutlined
                        style={{
                            marginRight: 8,
                            fontSize: 16,
                            color: orange,
                        }}
                    />
                    {toSlotRangeStr(showingSlotsForDate)}
                </ResText14Regular>

                <ul
                    className={"slot-items"}
                    style={{ marginTop: 32, display: "block" }}
                >
                    {availableSlots.map((item, index) => (
                        <li key={`scheduled-slot-apt-${index}`}>
                            <Checkbox
                                onChange={() =>
                                    handleTutorUpdateReq("slotSelected", item)
                                }
                                checked={newSelectedSlot(item)}
                                disabled={disabledScheduledSlot(
                                    showingSlotsForDate,
                                    item,
                                )}
                            />
                            <ResText14Regular>
                                {item.title}
                                <i className={"text-grey3"}>{` ${
                                    disabledScheduledSlot(
                                        showingSlotsForDate,
                                        item,
                                    )
                                        ? " (not available)"
                                        : ""
                                }`}</i>
                                {previouslySelectedSlot(item) && (
                                    <ResText14Regular
                                        className={"text-grey3"}
                                        style={{ marginLeft: 6 }}
                                    >
                                        <i>(previously selected slot)</i>
                                    </ResText14Regular>
                                )}
                            </ResText14Regular>
                        </li>
                    ))}
                </ul>

                <div className={"selected-slots-info vertical-start-flex"}>
                    <ResText14Regular>
                        <InfoCircleOutlined
                            style={{
                                fontSize: 16,
                                marginRight: 6,
                                color: "orange",
                            }}
                        />{" "}
                        You are about to change schedule time for this
                        appointment.
                    </ResText14Regular>
                    <MyButton
                        type={"primary"}
                        onClick={() => dispatchUpdateAptSchedule()}
                    >
                        <ResText12SemiBold>Submit changes</ResText12SemiBold>
                    </MyButton>
                </div>
            </SlotInfo>
        );
    };

    // ---------------- schedule details and rate tutor --------------

    const getCanRate = () => {
        if (appointment) {
            const now = new Date();
            const scheduledFor = new Date(appointment.scheduledAt);
            if (appointment.rating > 0)
                return [false, "The appointment has already been rated."];
            if (appointment.status === AppointmentStatus.PENDING)
                return [
                    false,
                    "The appointment is still in pending. Please wait til the tutor accepts your request.",
                ];
            if (appointment.status === AppointmentStatus.REJECTED)
                return [false, "The appointment has been rejected."];
            if (now.getTime() < scheduledFor.getTime())
                return [
                    false,
                    "The appintment has not been attended yet. " +
                        "You have an appointment starting from: " +
                        toMonthDateStr(scheduledFor) +
                        " " +
                        toHourMinStr(scheduledFor),
                ];
            return [
                true,
                "You can rate the tutor from angry (1) to very happy (4).",
            ];
        }
        return [false, "Invalid appointment."];
    };
    const rateResponse = getCanRate();
    const renderMenuComponent = (menuItems = getRoleBasedMenuItems(id)) => {
        const defaultTab = getDefaultTab()[0];
        const today = new Date();

        if (menuItems.length > 1)
            switch (defaultTab) {
                case menuItems[1].key:
                    return (
                        <TabContent>
                            <ResText14Regular
                                className={
                                    !rateResponse[0]
                                        ? "text-italic text-grey2"
                                        : ""
                                }
                            >
                                {appointment.rating > 0 ? (
                                    <CheckCircleFilled
                                        className={"rated-icon rated-icon-done"}
                                    />
                                ) : !rateResponse[0] ? (
                                    <InfoCircleOutlined
                                        className={
                                            "rated-icon rated-icon-not-allowed"
                                        }
                                    />
                                ) : (
                                    ""
                                )}
                                {rateResponse[1]}
                            </ResText14Regular>
                            <div className={"rate-tutor-content"}>
                                <div
                                    className={
                                        "rate-tutor-features h-start-top-flex"
                                    }
                                >
                                    <ResText14SemiBold className={"text-grey1"}>
                                        Tutoring skill
                                    </ResText14SemiBold>
                                    <ul className={"rate-tutor-options"}>
                                        {ratingOptions.map((item, index) => {
                                            const eitherSelectedOrAlreadyRated =
                                                appointment.rating ===
                                                    index + 1 ||
                                                (rateResponse[0] &&
                                                    index + 1 ===
                                                        rateRequest.rating);
                                            return (
                                                <Tooltip title={item.title}>
                                                    <li
                                                        key={
                                                            "rate-tutor-options-" +
                                                            item.id
                                                        }
                                                        onClick={() =>
                                                            rateResponse[0] &&
                                                            handleRateChanges(
                                                                "rating",
                                                                index + 1,
                                                            )
                                                        }
                                                        className={
                                                            item.className +
                                                            (eitherSelectedOrAlreadyRated
                                                                ? "-selected"
                                                                : "") +
                                                            (!appointmentIsAccepted
                                                                ? " rate-options-disabled"
                                                                : "")
                                                        }
                                                    >
                                                        {item.icon}
                                                    </li>
                                                </Tooltip>
                                            );
                                        })}
                                    </ul>
                                </div>
                                {rateResponse[0] && (
                                    <div className={"h-start-flex"}>
                                        <MyButton
                                            type={"primary"}
                                            disabled={!rateResponse[1]}
                                            onClick={() => dispatchRateTutor()}
                                        >
                                            <ResText14Regular>
                                                Submit your ratings
                                            </ResText14Regular>
                                        </MyButton>
                                    </div>
                                )}
                            </div>
                        </TabContent>
                    );
            }

        const scheduledSlot = getScheduledSlot();

        const dateCellRender = date => {
            if (appointment && scheduledSlot.length > 0) {
                const cellDate = new Date(date);
                const scheduledDate = new Date(appointment.scheduledAt);
                const cellMatchesScheduledDate =
                    cellDate.getDate() === scheduledDate.getDate() &&
                    cellDate.getMonth() === scheduledDate.getMonth();
                if (cellMatchesScheduledDate)
                    return (
                        <CalenderItem className={"h-centered-flex"}>
                            <Badge
                                status={"success"}
                                text={
                                    <ResText14Regular>
                                        {scheduledSlot[0].title}
                                    </ResText14Regular>
                                }
                            />
                        </CalenderItem>
                    );
            }
            return <></>;
        };

        return (
            <TabContent>
                <div className={"h-justified-flex"} style={{ marginBottom: 8 }}>
                    <ResText14Regular>
                        Scheduled for{" "}
                        <b>
                            {toMonthDateYearStr(
                                new Date(appointment.scheduledAt),
                            )}
                            {getScheduledSlot().length > 0 &&
                                ", " + getScheduledSlot()[0].title}
                        </b>
                    </ResText14Regular>
                    <ResText14Regular>
                        Today
                        <ResText14Regular
                            className={"text-grey"}
                            style={{ marginLeft: 12 }}
                        >
                            {toMonthDateYearStr(today)}
                        </ResText14Regular>
                    </ResText14Regular>
                </div>
                {appointment && (
                    <MyCalendar
                        dateCellRender={dateCellRender}
                        onClick={date =>
                            handleTutorUpdateReq("scheduledAt", new Date(date))
                        }
                        value={
                            tutorUpdateReq.scheduledAt ||
                            new Date(appointment.scheduledAt)
                        }
                    />
                )}
            </TabContent>
        );
    };

    const renderStatus = () => {
        const text = <ResText12Regular> {appointment.status}</ResText12Regular>;
        if (
            [AppointmentStatus.ACCEPTED, AppointmentStatus.PENDING].includes(
                appointment.status,
            )
        )
            return getStatusBox(appointment.status, text);
        return (
            <Tooltip title={"Tutor response: " + appointment.statusMessage}>
                {getStatusBox(appointment.status, text)}
            </Tooltip>
        );
    };

    const showSlotUpdateViewToModerator =
        isModerator &&
        appointment &&
        appointment.status === AppointmentStatus.PENDING;

    const appointmentView = appointment && (
        <>
            <div>
                <div className={"schedule-actor-view-mod h-justified-flex"}>
                    {renderActorInfo(
                        isTutor ? appointment.student : appointment.tutor,
                        isTutor ? "Student Info" : "Tutor Info",
                    )}
                    {isLoggedModerator(loggedUser) &&
                        renderActorInfo(appointment.student, "Student Info")}
                </div>
                {renderNeedsTutoring(
                    appointment.tutoringOnList,
                    appointment.studentNote,
                )}
            </div>

            <Row gutter={[24, 24]} className={"border-top"}>
                <Col xxl={16} md={24} className={"border-right no-padding"}>
                    {renderTabs(
                        getDefaultTab(),
                        () => renderMenuComponent(),
                        getRoleBasedMenuItems(id),
                        isTutor, // showRespond only for the appointment tutor
                        renderStatus(),
                        <RespondAction showRespondTitle={true} />,
                    )}
                </Col>
                {showSlotUpdateViewToModerator && (
                    <Col
                        xxl={8}
                        md={24}
                        className={"h-start-top-flex no-padding"}
                    >
                        {renderSlotView()}
                    </Col>
                )}
            </Row>
        </>
    );

    const emptyView = (
        <EmptyContent
            title={"Page not found"}
            desc={
                "Either the appointment does not exists or you are forbidden to access it."
            }
            showEmptyIcon={true}
            action={
                <Link to={"/schedules"}>
                    <MyButton type={"primary"}>
                        <ResText12SemiBold>Go to My Schedule</ResText12SemiBold>
                    </MyButton>
                </Link>
            }
        />
    );

    return (
        <Wrapper>
            <Header className={"h-justified-flex"}>
                <ResText14SemiBold>Schedule Details</ResText14SemiBold>
                <CopyToClipboard
                    text={copiedVal.value}
                    onCopy={() =>
                        openNotification("Copied!", "URL has been copied.")
                    }
                >
                    <MyButton type={"secondary"}>
                        Share <ShareAltOutlined />
                    </MyButton>
                </CopyToClipboard>
            </Header>
            <Spin spinning={loading}>
                <Content>
                    {appointment && loggedUserIsAllowedToView
                        ? appointmentView
                        : emptyView}
                </Content>
            </Spin>
        </Wrapper>
    );
}