import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {grey1, grey6, pearl} from "../../utils/ShadesUtils";
import {ResText14Regular, ResText14SemiBold, ResText16Regular, ResText16SemiBold,} from "../../utils/TextUtils";
import {renderActorInfo, renderNeedsTutoring, renderTabs, SlotInfo, TabContent,} from "../Schedule/ScheduleView";
import {CalendarOutlined, StarOutlined} from "@ant-design/icons";
import {getYearMonthDateHrsUtcFormat, toMonthDateYearStr, toSlotRangeStr} from "../../utils/DateUtils";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import {useParams} from "react-router";
import {useLocation, useNavigate} from "react-router-dom";
import {Checkbox, Col, Divider, Input, Row, Select, Spin} from "antd";
import MyButton from "../../components/Button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {fetchAptWithUser, fetchUser} from "../../redux/user/actions";
import {selectUser} from "../../redux/user/reducer";
import {UserAppointmentParams} from "../../redux/user/types";
import {calendarIntToMonth, getAvailableSlot} from "../../utils/ScheduleUtils";
import {AppointmentStatus} from "../../enum/AppointmentEnum";
import {createAppointment} from "../../redux/appointment/actions";
import {AppointmentType} from "../../redux/appointment/types";
import {selectAuth} from "../../redux/auth/reducer";
import {openNotification} from "../../utils/Alert";
import ViewTutorRatings from "./ViewTutorRatings";

const {TextArea} = Input;

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

const getMenuItems = id => [
    // {
    //     key: "profile-view",
    //     link: `/profile/${id}/details`,
    //     title: "Profile",
    //     icon: <UserOutlined/>,
    // },
    {
        key: "request-tutoring",
        link: `/profile/${id}/request-tutoring`,
        title: "Request for tutoring",
        icon: <CalendarOutlined/>,
    },
    {
        key: "view-tutor-ratings",
        link: `/profile/${id}/view-tutor-ratings`,
        title: "View tutor ratings",
        icon: <StarOutlined/>,
    },
];


const TutorProfile = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    // date that user select in the calendar
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());
    // date time for slot that user select
    const [selectedSlot, setSelectedSlot] = useState(undefined);
    const [selectedSlotDate, setSelectedSlotDate] = useState(undefined);
    // list of slots available for user to select
    const [availableSlots, setAvailableSlots] = useState([]);
    // request object for appointment creation
    const [requestInput, setRequestInput] = useState({note: "", subjects: []});
    // redux states
    const {loggedUser} = useSelector(selectAuth);
    const {user, aptsWithUser} = useSelector(selectUser);

    /******************* handle events ************************/
    const handleSlotClick = (selected, item) => {
        const selectedDateTs = new Date(selectedCalendarDate.getFullYear(),
            selectedCalendarDate.getMonth(),
            selectedCalendarDate.getDate(),
            item.start)
        setSelectedSlot(item);
        setSelectedSlotDate(selectedDateTs);
        console.log("selected slot: (could take time to state change)", selectedSlot,
            "\navailableSlots: ", availableSlots,
            "\nselected slot date (could take time to state change): ", selectedSlotDate,
            "\nlocal var for selectedSlotDate", selectedDateTs,
            "\nselected slot utc date: ", selectedSlotDate?.toUTCString(),
            "\nselected slot utc date to local time: ", new Date(selectedSlotDate.toUTCString()),
        )
    }

    const handleReqInput = (key, value: string | string[]) => {
        console.log(`request input value: `, value);
        setRequestInput({...requestInput, [key]: value});
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
        const today = new Date();
        const params: UserAppointmentParams = {
            status: AppointmentStatus.ACCEPTED,
            year: `${today.getUTCFullYear()}`, // backend stores date in UTC format
            month: calendarIntToMonth[today.getUTCMonth()] // // backend stores date in UTC format
        };
        dispatch(fetchAptWithUser(id, params))
    }, [dispatch]);

    const dispatchCreateApt = () => {
        if (!selectedSlotDate)
            return openNotification("No slots selected", "Please select a slot for tutoring")
        const req: AppointmentType = {
            tutorId: id,
            studentId: loggedUser.id,
            studentNote: requestInput["note"],
            tutoringOnList: requestInput["subjects"],
            scheduledAt: getYearMonthDateHrsUtcFormat(selectedSlotDate),
        };
        console.log("creating apt req: ", req);
        const callback = (apt: AppointmentType) => {
            openNotification("Appointment request", "You have successfully created the appointment request.")
            navigate(`/schedules/${apt.id}`);
        };
        dispatch(createAppointment(req, callback));
    }

    /******************* get local values ************************/
    const getAvailableSlotsFromAcceptedApts = () => {
        const slots = getAvailableSlot(selectedCalendarDate, aptsWithUser);
        setAvailableSlots(slots);
    }
    const getExpertiseOptions = () => !!user ? user.expertise.map(item => {
        return {label: item, value: item}
    }) : []

    /******************* use effects ************************/
    useEffect(() => {
        if (!!id) {
            dispatchFetchUser();
            dispatchFetchAptsWithUser();
        }
    }, [dispatchFetchUser, dispatchFetchAptsWithUser]);

    useEffect(() => {
        getAvailableSlotsFromAcceptedApts();
    }, [selectedCalendarDate]);


    const getDefaultTab = () => {
        const menuItems = getMenuItems(id);
        const pathname = location ? location.pathname : "/profile/" + id;
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
    };

    const renderMenuComponent = (menuItems = getMenuItems(id)) => {
        const defaultTab = getDefaultTab()[0];
        const today = new Date();
        switch (defaultTab) {
            case menuItems[0].key:
                const onClick = date => {
                    alert("hello, " + toMonthDateYearStr(new Date(date)));
                    setSelectedCalendarDate(new Date(date));
                };
                return (
                    <TabContent>
                        <div
                            className={"h-justified-flex medium-vertical-margin"}>
                            <ResText16Regular>
                                Pick a date and slot time for tutoring.
                            </ResText16Regular>
                            <ResText16SemiBold>
                                <b>Today</b>
                                <ResText16Regular
                                    className={"text-grey"}
                                    style={{marginLeft: 12}}
                                >
                                    {toMonthDateYearStr(today)}
                                </ResText16Regular>
                            </ResText16SemiBold>
                        </div>
                        <MyCalendar onClick={onClick}/>
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
                return <ViewTutorRatings/>;
        }
    };

    const renderCurrentSlot = () => (
        <SlotInfo>
            <div className={"vertical-start-flex selected-slots-info"}>
                <ResText14Regular className={"text-grey2"}>
                    Showing slots for
                    <b style={{marginLeft: 8, color: grey1}}>
                        {`${toMonthDateYearStr(selectedCalendarDate)}`}
                    </b>
                </ResText14Regular>
                {selectedSlotDate && <ResText14Regular className={"text-grey2 text-underlined"}>
                    You selected {`${toMonthDateYearStr(selectedSlotDate)} ${toSlotRangeStr(selectedSlotDate)}`}
                </ResText14Regular>}
            </div>
            <ul className={"slot-items"}>
                {availableSlots.map((item, index) => (
                    <li key={`available-slot-apt-${index}`}>
                        <Checkbox
                            checked={!!selectedSlot && selectedSlot["title"] === item.title}
                            disabled={!item.available}
                            onChange={(e) => handleSlotClick(e.target.checked, item)}/>
                        <ResText14Regular>{item.title}</ResText14Regular>
                    </li>
                ))}
            </ul>
            {user && <div className={"vertical-start-flex select-needs-tutoring-in"}>
                <ResText14Regular>Needs tutoring in</ResText14Regular>
                <Select
                    mode="multiple"
                    allowClear
                    style={{width: '95%'}}
                    placeholder="Select tutoring topics..."
                    onChange={value => handleReqInput("subjects", value)}
                    options={getExpertiseOptions()}
                />
            </div>}
            {user && <div className={"vertical-start-flex tutoring-notes"}>
                <ResText14Regular>Add a note (optional)</ResText14Regular>
                <TextArea size={"large"}
                          onChange={(e) => {
                              // console.log("input write change: ", e, e.currentTarget.value)
                              e.stopPropagation();
                              handleReqInput("note", e.currentTarget.value);
                          }}
                          placeholder={"Add a note to the tutor..."}/>
            </div>}
            <div className={"send-slot-request h-start-top-flex"}>
                <ResText16Regular>
                    By confirming the request, you confirm that this is only
                    a request for tutoring and the tutor may decline to
                    provide the tutoring service.
                </ResText16Regular>
                <MyButton type={"primary"}
                          onClick={() => dispatchCreateApt()}>
                    Send Request
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

    const renderSlotView = tabOpened =>
        tabOpened === "" || tabOpened === getMenuItems(id)[0].key
            ? renderCurrentSlot()
            : renderOtherReviews();

    return (
        <Wrapper>
            <Header>
                <ResText14SemiBold>Tutor Profile</ResText14SemiBold>
            </Header>
            <Spin spinning={loading}>
                <Content>
                    <div>
                        {renderActorInfo(user)}
                        {renderNeedsTutoring(user, "Specializations", "")}
                    </div>

                    <Row gutter={[24, 24]}>
                        <Col xxl={16} md={24} className={"border-right no-padding"}>
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
                            <Divider type={"horizontal"}/>
                            {renderSlotView(getDefaultTab()[0])}
                        </Col>
                    </Row>
                </Content>
            </Spin>
        </Wrapper>
    );
};

export default TutorProfile;
