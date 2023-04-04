import React, { useState } from "react";
import styled from "styled-components";
import {
    ResText12Regular,
    ResText14Regular,
    ResText14SemiBold,
} from "../../utils/TextUtils";

import { Avatar, Col, Divider, Row, Tag, Input } from "antd";
import { grey6 } from "../../utils/ShadesUtils";
import { time } from "../../static_data/time";
import { SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import { toMonthDateYearStr } from "../../utils/DateUtils";
import MyButton from "../../components/Button/MyButton";
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
    margin-top: 30px;
    overflow: auto;
`;

const ScheduleActorInfo = styled.div.attrs({
    className: "outer-shadow",
})`
    width: 40em;
    margin-top: 20px;
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
    const [slot, setSlot] = useState({
        time: "9 AM to 10 AM",
    });

    const onClick = date =>
        alert("hello, " + toMonthDateYearStr(new Date(date)));
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
                            My Schedule - Schedule #ID 329982
                        </ResText14SemiBold>

                        <ResText14SemiBold style={{ float: "right" }}>
                            <Tag
                                color="green"
                                style={{
                                    padding: "5px",
                                    width: "5vw",
                                    textAlign: "center",
                                }}
                            >
                                Accepted
                            </Tag>
                        </ResText14SemiBold>
                    </Col>

                    <Col span={0} />
                </Row>
            </Header>
            <Content>
                <ResText14SemiBold>Schedule for</ResText14SemiBold>
                <Divider type={"vertical"} />
                <ResText14Regular className={"text-grey3"}>
                    11 May
                </ResText14Regular>
                <Divider type={"vertical"} />
                <Tag
                    color="blue"
                    style={{
                        borderRadius: "20px",
                        width: "7em",
                        padding: "5px",
                        textAlign: "center",
                    }}
                >
                    3-4PM
                </Tag>

                <div className="arrange-div">
                    <ScheduleActorInfo>
                        <ResText14SemiBold>Student Info</ResText14SemiBold>
                        <div className={"h-start-flex actor-info-content"}>
                            <Avatar shape="circle" size={64} />
                            <div
                                className={
                                    "vertical-start-flex actor-profile-info"
                                }
                            >
                                <ResText14SemiBold>
                                    Mr Sumit Dhungana
                                </ResText14SemiBold>
                                <ResText14Regular className={"text-grey3"}>
                                    Joined in Jan 24, 2023
                                </ResText14Regular>
                            </div>
                        </div>
                    </ScheduleActorInfo>

                    <ScheduleActorInfo>
                        <ResText14SemiBold>Tutor Info</ResText14SemiBold>
                        <div className={"h-start-flex actor-info-content"}>
                            <Avatar shape="circle" size={64} />
                            <div
                                className={
                                    "vertical-start-flex actor-profile-info"
                                }
                            >
                                <ResText14SemiBold>
                                    Mrs. John Doe{" "}
                                    <Link to={"/profile/2"}>
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
                </div>

                <MyButton
                    type={"primary"}
                    className="small-padding medium-vertical-margin  delete-app danger-context-card-label"
                >
                    Delete this appointment
                </MyButton>

                <ContentCalendar>
                    <MyCalendar onClick={onClick} />
                    <ResText12Regular className={`text-grey`}>
                        Select available slots
                    </ResText12Regular>
                    <TimeSlot>
                        {time.map((item, index) => (
                            <Tag
                                color="purple"
                                style={{
                                    fontSize: "8px",
                                    borderRadius: "20px",
                                    width: "9em",
                                    padding: "3px",
                                    textAlign: "center",
                                }}
                            >
                                {item}
                            </Tag>
                        ))}
                    </TimeSlot>
                    <ResText12Regular className={"text-grey3"}>
                        Add a note
                    </ResText12Regular>
                    <div className="arrange-div">
                        <Input.TextArea
                            className="comment-textarea"
                            autoSize={{ minRows: 6, maxRows: 10 }}
                        />
                        <div>
                            <ResText12Regular className={"text-grey3"}>
                                It may take a couple of days for tutor to
                                respond to your request.
                            </ResText12Regular>
                            <MyButton
                                type={"primary"}
                                className="small-padding medium-vertical-margin "
                            >
                                Update
                                <SendOutlined />
                            </MyButton>
                        </div>
                    </div>
                </ContentCalendar>
            </Content>
        </Wrapper>
    );
};

export default TutorSchedule;
