import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { grey1, grey6, pearl } from "../../utils/ShadesUtils";
import {
    ResText12Regular,
    ResText12SemiBold,
    ResText14Regular,
    ResText14SemiBold,
} from "../../utils/TextUtils";
import {
    renderActorInfo,
    renderNeedsTutoring,
    renderTabs,
    SlotInfo,
    TabContent,
} from "../Schedule/ScheduleView";
import {
    CalendarOutlined,
    InfoCircleOutlined,
    StarOutlined,
} from "@ant-design/icons";
import {
    getYearMonthDateHrsUtcFormat,
    toMonthDateYearStr,
    toSlotRangeStr,
} from "../../utils/DateUtils";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox, Col, Divider, Input, Row, Select, Spin } from "antd";
import MyButton from "../../components/Button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchAptWithUser, fetchUser } from "../../redux/user/actions";
import { selectUser } from "../../redux/user/reducer";
import {
    calendarIntToMonth,
    disabledScheduledSlotForReqCreate,
    getAvailableSlot,
} from "../../utils/ScheduleUtils";
import { AppointmentStatus } from "../../enum/AppointmentEnum";
import { createAppointment } from "../../redux/appointment/actions";
import { selectAuth } from "../../redux/auth/reducer";
import { AlertType, openNotification } from "../../utils/Alert";
import ViewTutorRatings from "./ViewTutorRatings";
import { isLoggedModerator, isLoggedTutor } from "../../utils/AuthUtils";

const { TextArea } = Input;

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

const TutorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    // date that user select in the calendar
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(
        new Date(),
    );
    // date time for slot that user select
    const [selectedSlot, setSelectedSlot] = useState(undefined);
    const [selectedSlotDate, setSelectedSlotDate] = useState(undefined);
    // list of slots available for user to select
    const [availableSlots, setAvailableSlots] = useState([]);
    // request object for appointment creation
    const [requestInput, setRequestInput] = useState({
        note: "",
        subjects: [],
    });
    // redux states
    const { loggedUser } = useSelector(selectAuth);
    const { user, aptsWithUser } = useSelector(selectUser);

    // if logged user is the tutor the user is currently viewing
    const loggedUserIsTutor = loggedUser && loggedUser?.id?.toString() === id;
    const isModerator = isLoggedModerator(loggedUser);
    const loggedUserIsAnyTutor = isLoggedTutor(loggedUser);
    const showOnlyViewRatings =
        isModerator || loggedUserIsTutor || loggedUserIsAnyTutor;
    const canEditTutorProfile = isModerator || loggedUserIsTutor;

    /******************* handle events ************************/
    const handleSlotClick = (selected, item) => {
        const selectedDateTs = new Date(
            selectedCalendarDate.getFullYear(),
            selectedCalendarDate.getMonth(),
            selectedCalendarDate.getDate(),
            item.start,
        );
        setSelectedSlot(item);
        setSelectedSlotDate(selectedDateTs);
        console.log(
            "selected slot: (could take time to state change)",
            selectedSlot,
            "\navailableSlots: ",
            availableSlots,
            "\nselected slot date (could take time to state change): ",
            selectedSlotDate,
            "\nlocal var for selectedSlotDate",
            selectedDateTs,
            "\nselected slot utc date: ",
            selectedSlotDate?.toUTCString(),
            "\nselected slot utc date to local time: ",
            new Date(selectedSlotDate.toUTCString()),
        );
    };

    const handleReqInput = (key, value) => {
        setRequestInput({ ...requestInput, [key]: value });
    };

    /******************* validations ************************/
    const validateAptCreation = () => {
        let success = true;
        if (!selectedSlotDate) {
            openNotification(
                "No slots selected",
                "Please select a slot for tutoring",
                AlertType.WARNING,
            );
            success = false;
        }
        if (requestInput.subjects.length === 0) {
            openNotification(
                "No subjects selected",
                "Please select at least one subject you need tutoring for.",
                AlertType.WARNING,
            );
            success = false;
        }
        return success;
    };

    /******************* dispatches ************************/
    const dispatchFetchUser = useCallback(() => {
        dispatch(fetchUser(id));
        setLoading(false);
    }, [dispatch]);

    // todo: remove comment
    // /user/:id/appointment?status=ACCEPTED&year=2023&month=0
    // return all the ACCEPTED appointments for a given month of a year and
    // do some manipulation to show all the other slots as available slots
    const dispatchFetchAptsWithUser = useCallback(() => {
        const selectedDate = selectedCalendarDate || new Date();
        const params = {
            status: AppointmentStatus.ACCEPTED,
            year: `${selectedDate.getUTCFullYear()}`, // backend stores date in UTC format
            month: calendarIntToMonth[selectedDate.getUTCMonth()], // // backend stores date in UTC format
        };
        // @ts-ignore
        dispatch(fetchAptWithUser(id, params));
    }, [selectedCalendarDate, id]);

    const dispatchCreateApt = () => {
        const success = validateAptCreation();
        if (success) {
            const req = {
                tutorId: id,
                studentId: loggedUser.id,
                studentNote: requestInput["note"],
                tutoringOnList: requestInput["subjects"],
                scheduledAt: getYearMonthDateHrsUtcFormat(selectedSlotDate),
            };
            const onSuccess = apt => {
                openNotification(
                    "Appointment request",
                    "You have successfully created the appointment request.",
                    AlertType.SUCCESS,
                );
                navigate(`/schedules/${apt.id}`);
            };
            const onError = err => {
                openNotification(
                    "Failed to create an appointment request.",
                    err,
                    AlertType.ERROR,
                );
            };
            dispatch(createAppointment(req, onSuccess, onError));
        }
    };

    /******************* get local values ************************/
    const getAvailableSlotsFromAcceptedApts = () => {
        const slots = getAvailableSlot(
            selectedCalendarDate,
            aptsWithUser,
            loggedUser?.id,
        );
        setAvailableSlots(slots);
    };
    const getExpertiseOptions = () =>
        !!user
            ? user.expertise.map(item => {
                  return { label: item, value: item };
              })
            : [];

    /******************* use effects ************************/
    useEffect(() => {
        if (!!id) {
            dispatchFetchUser();
        }
    }, [id]);

    useEffect(() => {
        if (!!id) {
            dispatchFetchAptsWithUser();
        }
    }, [id, selectedSlotDate]);

    useEffect(() => {
        getAvailableSlotsFromAcceptedApts();
    }, [selectedCalendarDate]);

    useEffect(() => {
        const menuItems = getMenuItems(id);
        if (showOnlyViewRatings) {
            navigate(menuItems[0].link, { replace: true });
        }
    }, [loggedUser]);

    /******************* render children ************************/

    const getMenuItems = id => {
        const items = [
            {
                key: "request-tutoring",
                link: `/find-tutors/profile/${id}/request-tutoring`,
                title: "Request for tutoring",
                icon: <CalendarOutlined />,
            },
            {
                key: "view-tutor-ratings",
                link: `/find-tutors/profile/${id}/view-tutor-ratings`,
                title: "View ratings",
                icon: <StarOutlined />,
            },
        ];

        if (showOnlyViewRatings) return [items[1]];
        return items;
    };

    const getDefaultTab = () => {
        const menuItems = getMenuItems(id);
        const pathname = location
            ? location.pathname
            : "/find-tutors/profile/" + id;
        // if tutor profile is viewed by student
        if (!showOnlyViewRatings) {
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

    const renderMenuComponent = (menuItems = getMenuItems(id)) => {
        const defaultTab = getDefaultTab()[0];
        const today = new Date();

        if (showOnlyViewRatings) return <ViewTutorRatings />;

        switch (defaultTab) {
            case menuItems[0].key:
                const onClick = date => {
                    setSelectedCalendarDate(new Date(date));
                };
                return (
                    <TabContent>
                        <div
                            className={"h-justified-flex small-vertical-margin"}
                        >
                            <ResText14Regular>
                                Pick a date and slot time for tutoring.
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
                        <MyCalendar
                            value={selectedCalendarDate}
                            onClick={onClick}
                        />
                    </TabContent>
                );

            // case menuItems[2].key:
            //     return <TabContent>
            //         <ResText16SemiBold>
            //             Request for tutoring
            //         </ResText16SemiBold>
            //         <div className={"rate-tutor-content"}>
            //             <div className={"rate-tutor-features h-start-top-flex"}>
            //                 <ResText16Regular className={"text-grey2"}>Tutoring skill</ResText16Regular>
            //             </div>
            //             <div className={"rate-tutor-comment h-start-flex"}>
            //                 <ResText16Regular className={"text-grey2"}>Add comment (Optional)</ResText16Regular>
            //                 <Input rootClassName={"rate-tutor-input"} size={"large"} bordered/>
            //             </div>
            //             <div className={"h-end-flex"}>
            //                 <MyButton type={"primary"}>
            //                     <ResText14Regular>Submit your ratings</ResText14Regular>
            //                 </MyButton>
            //             </div>
            //         </div>
            //     </TabContent>

            default:
                return <ViewTutorRatings />;
        }
    };

    const renderCurrentSlot = () => (
        <SlotInfo>
            <div className={"vertical-start-flex selected-slots-info"}>
                <ResText14Regular className={"text-grey2"}>
                    Showing slots for
                    <b style={{ marginLeft: 8, color: grey1 }}>
                        {`${toMonthDateYearStr(selectedCalendarDate)}`}
                    </b>
                </ResText14Regular>
                {selectedSlotDate && (
                    <ResText14Regular className={"text-grey2 text-underlined"}>
                        You selected{" "}
                        {`${toMonthDateYearStr(
                            selectedSlotDate,
                        )} ${toSlotRangeStr(selectedSlotDate)}`}
                    </ResText14Regular>
                )}
            </div>
            <ul className={"slot-items"}>
                {availableSlots.map((item, index) => (
                    <li key={`available-slot-apt-${index}`}>
                        <Checkbox
                            checked={
                                !!selectedSlot &&
                                selectedSlot["title"] === item.title
                            }
                            disabled={disabledScheduledSlotForReqCreate(
                                selectedCalendarDate,
                                item,
                            )}
                            onChange={e =>
                                handleSlotClick(e.target.checked, item)
                            }
                        />
                        <ResText14Regular>{item.title}</ResText14Regular>
                        {!item.available && (
                            <ResText12Regular
                                className={"text-grey2 text-italic"}
                            >
                                (not available)
                            </ResText12Regular>
                        )}
                    </li>
                ))}
            </ul>
            {user && (
                <div className={"vertical-start-flex select-needs-tutoring-in"}>
                    <ResText14Regular>Needs tutoring in</ResText14Regular>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "95%" }}
                        placeholder="Select tutoring topics..."
                        onChange={value => handleReqInput("subjects", value)}
                        options={getExpertiseOptions()}
                    />
                </div>
            )}
            {user && (
                <div className={"vertical-start-flex tutoring-notes"}>
                    <ResText14Regular>Add a note (optional)</ResText14Regular>
                    <TextArea
                        size={"large"}
                        onChange={e => {
                            // console.log("input write change: ", e, e.currentTarget.value)
                            e.stopPropagation();
                            handleReqInput("note", e.currentTarget.value);
                        }}
                        placeholder={"Add a note to the tutor..."}
                    />
                </div>
            )}
            <div className={"send-slot-request h-start-top-flex"}>
                <ResText14Regular>
                    <InfoCircleOutlined
                        style={{
                            color: "orange",
                            marginRight: 6,
                            fontSize: 14,
                        }}
                    />{" "}
                    By confirming the request, you confirm that this is only a
                    request for tutoring and the tutor may decline to provide
                    the tutoring service.
                </ResText14Regular>
                <MyButton type={"primary"} onClick={() => dispatchCreateApt()}>
                    <ResText12SemiBold>Send Request</ResText12SemiBold>
                </MyButton>
            </div>
        </SlotInfo>
    );

    const renderOtherReviews = () => (
        <TabContent>
            {/*<ResText16Regular className={"text-grey2"}>*/}
            {/*    Other reviews*/}
            {/*</ResText16Regular>*/}
            {/*<ul className={"ratings-other-reviews"}>*/}
            {/*    {new Array(3).fill(1).map((item, index) => (*/}
            {/*        <li>*/}
            {/*            <ResText14Regular key={index}>*/}
            {/*                I am writing this review {item} for index {index}*/}
            {/*            </ResText14Regular>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </TabContent>
    );

    const renderSlotView = tabOpened => {
        if (showOnlyViewRatings)
            //  loggedUserIsTutor || isLoggedModerator(loggedUser)
            return renderOtherReviews();
        return tabOpened === "" || tabOpened === getMenuItems(id)[0].key
            ? renderCurrentSlot()
            : renderOtherReviews();
    };

    return (
        <Wrapper>
            <Header>
                <ResText14SemiBold>Tutor Profile</ResText14SemiBold>
            </Header>
            <Spin spinning={loading}>
                <Content>
                    <div>
                        {renderActorInfo(
                            user,
                            "Tutor info",
                            loggedUser?.id,
                            canEditTutorProfile,
                        )}
                        {renderNeedsTutoring(
                            user?.expertise || [],
                            undefined,
                            "Specializations",
                            "",
                            canEditTutorProfile,
                        )}
                    </div>

                    <Row gutter={[24, 24]}>
                        <Col
                            xxl={16}
                            md={24}
                            className={"border-right no-padding"}
                        >
                            {renderTabs(
                                getDefaultTab(),
                                () => renderMenuComponent(),
                                getMenuItems(id),
                            )}
                        </Col>
                        <Col
                            xxl={8}
                            md={24}
                            className={"h-start-top-flex no-padding"}
                        >
                            <Divider type={"horizontal"} />
                            {renderSlotView(getDefaultTab()[0])}
                        </Col>
                    </Row>
                </Content>
            </Spin>
        </Wrapper>
    );
};

export default TutorProfile;
