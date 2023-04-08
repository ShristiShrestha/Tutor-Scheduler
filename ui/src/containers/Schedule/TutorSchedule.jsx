import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {ResText12Regular, ResText14Regular, ResText14SemiBold,} from "../../utils/TextUtils";
import {Checkbox, Col, Divider, Input, Row, Tag} from "antd";
import {grey1, grey6} from "../../utils/ShadesUtils";
import {SendOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import {toHourMinStr, toJavaDate, toMonthDateYearStr, toSlotRangeStr,} from "../../utils/DateUtils";
import MyButton from "../../components/Button/MyButton";
import {selectAppointment} from "../../redux/appointment/reducer";
import {useDispatch, useSelector} from "react-redux";
import {deleteAppointment, fetchAppointment, updateAppointment,} from "../../redux/appointment/actions";
import {selectAuth} from "../../redux/auth/reducer";
import {renderActorInfo, SlotInfo} from "./ScheduleView";
import {getAvailableSlot} from "../../utils/ScheduleUtils";
import {selectUser} from "../../redux/user/reducer";

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 48px; // height of main top header - app name
  left: 200px;
  right: 0;
  padding: 0 24px;
  border-bottom: 1px solid ${grey6};

  .ant-row {
    width: 100%;
  }

  .ant-col {
    align-self: center;
  }
`;

const Wrapper = styled.div`
  padding: 24px;
`;

const Content = styled.div`
  padding: 24px;
  margin-top: 30px;
  height: calc(100vh - 48px);
  overflow: auto;

  .arrange-div {
    display: flex;
    justify-content: space-between;
  }

  .delete-app {
    margin-left: 620px;
  }
`;

const TimeSlot = styled.div`
  // margin-top: 30px;
  // overflow: auto;
  margin-bottom: 30px;
`;

const ScheduleActorInfo = styled.div.attrs({
    className: "outer-shadow",
})`
  width: 40em;
  margin-top: 20px;
  border: 1px solid ${grey6};
  background: white;
  border-radius: 8px;
  column-gap: 24px;
  margin-bottom: 24px;
`;

const ContentCalendar = styled.div.attrs({
    className: "vertical-start-flex outer-shadow",
})`
  max-width: 860px;
  padding: 24px;
  border: 1px solid ${grey6};
  background: white;
  border-radius: 8px;
  column-gap: 24px;
  margin-bottom: 24px;
  align-items: start;
  row-gap: 4px;

  .comment-textarea {
    border: 1px solid; /* Add a solid line to the bottom */
  }

  .select-slot {
    background-color: #d3adf7;
  }
`;

const TutorSchedule = () => {
    const {id} = useParams();
    const {loggedUser} = useSelector(selectAuth);
    const {appointment} = useSelector(selectAppointment);
    const {aptsWithUser} = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [requestInput, setRequestInput] = useState({
        note: "",
    });
    const [loading, setLoading] = useState(true);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(
        new Date(),
    );
    const [selectedSlot, setSelectedSlot] = useState(undefined);
    const [selectedSlotDate, setSelectedSlotDate] = useState(undefined);
    const [availableSlots, setAvailableSlots] = useState([]);

    const onClick = date => {
        setSelectedCalendarDate(new Date(date));
    };

    const dispatchFetchAppointment = useCallback(() => {
        dispatch(fetchAppointment(id));
        setLoading(false);
    }, [dispatch]);

    const handleSlotClick = (selected, item) => {
        const selectedDateTs = new Date(
            selectedCalendarDate.getFullYear(),
            selectedCalendarDate.getMonth(),
            selectedCalendarDate.getDate(),
            item.start,
        );
        setSelectedSlot(item);
        setSelectedSlotDate(selectedDateTs);
    };

    const handleReqInput = (key, value) => {
        setRequestInput({...requestInput, [key]: value});
    };

    useEffect(() => {
        if (!!id) {
            dispatchFetchAppointment();
            getAvailableSlotsFromAcceptedApts();
        }
    }, [dispatchFetchAppointment, selectedCalendarDate]);

    const getAvailableSlotsFromAcceptedApts = () => {
        const slots = getAvailableSlot(selectedCalendarDate, aptsWithUser);
        setAvailableSlots(slots);
    };

    const dispatchUpdateApt = () => {
        const formattedDate = toJavaDate(selectedSlotDate);
        const req = {
            id: appointment.id,
            status: appointment.status,
            statusMessage: requestInput.note,
            // scheduledAt: formattedDate,
        };
        dispatch(updateAppointment(req));
    };

    const dispatchDeleteApt = () => {
        const callback = apt => navigate(`/schedules/${appointment.id}`);
        dispatch(deleteAppointment(appointment.id, callback));
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
                            disabled={!item.available}
                            onChange={e =>
                                handleSlotClick(e.target.checked, item)
                            }
                        />
                        <ResText14Regular>
                            {item && item.title}
                        </ResText14Regular>
                    </li>
                ))}
            </ul>
        </SlotInfo>
    );

    return (
        <Wrapper>
            <Header>
                <Row>
                    <Col span={20}>
                        <ResText14SemiBold
                            style={{
                                marginTop: "10px",
                            }}
                        >
                            My Schedule - Schedule #ID {appointment?.id}
                        </ResText14SemiBold>

                        <ResText14SemiBold style={{float: "right"}}>
                            <Tag
                                color={"blue"}
                                style={{
                                    padding: "5px",
                                    width: "5vw",
                                    textAlign: "center",
                                }}
                            >
                                {appointment?.status}
                            </Tag>
                        </ResText14SemiBold>
                    </Col>

                    <Col span={0}/>
                </Row>
            </Header>
            <Content>
                <ResText14SemiBold>Schedule for</ResText14SemiBold>
                <Divider type={"vertical"}/>
                <ResText14Regular className={"text-grey3"}>
                    {appointment
                        ? toMonthDateYearStr(new Date(appointment.scheduledAt))
                        : null}
                </ResText14Regular>
                <Divider type={"vertical"}/>
                <Tag
                    color="blue"
                    style={{
                        borderRadius: "20px",
                        width: "7em",
                        padding: "5px",
                        textAlign: "center",
                    }}
                >
                    {appointment
                        ? toHourMinStr(new Date(appointment?.scheduledAt))
                        : null}
                </Tag>

                <div className="arrange-div">
                    <ScheduleActorInfo>
                        {appointment
                            ? renderActorInfo(
                                appointment.student,
                                "Student Info",
                            )
                            : null}
                    </ScheduleActorInfo>

                    <ScheduleActorInfo>
                        {appointment
                            ? renderActorInfo(appointment.tutor)
                            : null}
                    </ScheduleActorInfo>
                </div>

                <MyButton
                    type={"primary"}
                    className="small-padding medium-vertical-margin  delete-app danger-context-card-label"
                    onClick={() => dispatchDeleteApt()}
                >
                    Delete this appointment
                </MyButton>

                <ContentCalendar>
                    <MyCalendar onClick={onClick}/>
                    {renderCurrentSlot()}
                    <ResText12Regular className={"text-grey3"}>
                        Add a note
                    </ResText12Regular>
                    <div className="arrange-div">
                        <Input.TextArea
                            className="comment-textarea"
                            autoSize={{minRows: 6, maxRows: 10}}
                            defaultValue={appointment?.studentNote}
                            onChange={e => {
                                e.stopPropagation();
                                handleReqInput("note", e.currentTarget.value);
                            }}
                        />
                        <div>
                            <ResText12Regular className={"text-grey3"}>
                                It may take a couple of days for tutor to
                                respond to your request.
                            </ResText12Regular>
                            <MyButton
                                type={"primary"}
                                className="small-padding medium-vertical-margin"
                                onClick={() => dispatchUpdateApt()}
                            >
                                Update
                                <SendOutlined/>
                            </MyButton>
                        </div>
                    </div>
                </ContentCalendar>
            </Content>
        </Wrapper>
    );
};

export default TutorSchedule;
