import React from "react";
import { StatusTagList } from "../../components/Card/ScheduleCard";
import { expertises } from "../../static_data/tutors";
import styled from "styled-components";
import {
    ResText12Regular,
    ResText14Regular,
    ResText14SemiBold,
    ResText10Regular,
} from "../../utils/TextUtils";
import { Avatar, Col, Divider, Row, Tag, Input } from "antd";
import { grey6 } from "../../utils/ShadesUtils";

const Header = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 48px;
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
    overflow: auto;
    height: calc(100vh - 48px);
    .arrange-div {
        display: flex;
    }
`;

const ScheduleActorInfo = styled.div.attrs({
    className: "outer-shadow",
})`
    max-width: 500px;
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

const NeedsTutoring = styled.div.attrs({
    className: "vertical-start-flex outer-shadow",
})`
    max-width: 500px;
    padding: 24px;
    border: 1px solid ${grey6};
    background: white;
    border-radius: 8px;
    column-gap: 24px;
    margin-bottom: 24px;
    align-items: start;
    row-gap: 4px;
`;

const ResponseAppointment = styled.div.attrs({
    className: "vertical-start-flex",
})`
    padding: 24px;
    -webkit-box-align: start;
    width: 40vw;
    margin-left: 25px;

    .button-text {
        display: inline-block;
        padding: 7px 19px;
        color: white;
        border-radius: 5px;
        width: 24vw;
        text-align: center;
        font-weight: 600;
        border: transparent;
        margin-bottom: 20px;
    }
    .button-green {
        background-color: #1bb885;
    }
    .button-red {
        background-color: #f44336;
    }
    .margin-left {
        margin-left: 40px;
    }
    .comment-textarea {
        // border: none; /* Remove the default border */
        border: 1px solid; /* Add a solid line to the bottom */
    }
    .time-tag {
        border-radius: 20px;
        padding: 0 5px 0 5px;
        width: 6em;
    }
`;

const TutorStatusPage = ({ isAccepted }) => {
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
                            {isAccepted ? (
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
                            ) : (
                                <Tag
                                    color="blue"
                                    style={{
                                        padding: "5px",
                                        width: "5vw",
                                        textAlign: "center",
                                    }}
                                >
                                    Pending
                                </Tag>
                            )}
                        </ResText14SemiBold>
                    </Col>

                    <Col span={0} />
                </Row>
            </Header>
            <Content>
                <ResText14SemiBold>Schedule for</ResText14SemiBold>
                <Divider type={"vertical"} />
                <ResText14Regular className={"text-grey3"}>
                    11 May - 3 Slots
                </ResText14Regular>
                <Divider type={"vertical"} />
                <Tag
                    color="red"
                    style={{
                        borderRadius: "20px",
                        width: "7em",
                        padding: "5px",
                        textAlign: "center",
                    }}
                >
                    10-11AM{" "}
                </Tag>
                <Tag
                    color="green"
                    style={{
                        borderRadius: "20px",
                        width: "7em",
                        padding: "5px",
                        textAlign: "center",
                    }}
                >
                    12 AM-1 PM
                </Tag>
                <Tag
                    color="blue"
                    style={{
                        borderRadius: "20px",
                        width: "7em",
                        padding: "5px",
                        textAlign: "center",
                    }}
                >
                    3 PM-4 PM
                </Tag>
                <div className="arrange-div">
                    <div>
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
                                        Shristi Shrestha
                                    </ResText14SemiBold>
                                    <ResText14Regular className={"text-grey3"}>
                                        Joined in Jan 24, 2023
                                    </ResText14Regular>
                                </div>
                            </div>
                        </ScheduleActorInfo>

                        <NeedsTutoring>
                            <ResText14SemiBold>
                                Needs tutoring in
                            </ResText14SemiBold>
                            <StatusTagList>
                                {expertises &&
                                    expertises.map(expertise => (
                                        <Tag>
                                            <ResText12Regular>
                                                {expertise}
                                            </ResText12Regular>
                                        </Tag>
                                    ))}
                            </StatusTagList>
                            <div style={{ marginTop: "1rem" }}>
                                <ResText12Regular className={"text-grey2"}>
                                    Note -
                                </ResText12Regular>
                                <ResText12Regular>
                                    Note - Lorem impsum is simply dummy text of
                                    the printing and typesetting industry. Lorem
                                    inpuum has been the indsutry staandrs test
                                    ever.
                                </ResText12Regular>
                            </div>
                        </NeedsTutoring>
                    </div>

                    {!isAccepted && (
                        <ResponseAppointment>
                            <ResText14Regular className="button-green button-text default-margin-right select-item">
                                Accept
                            </ResText14Regular>
                            <ResText14Regular className="button-red button-text select-item">
                                Reject
                            </ResText14Regular>
                            <ResText14SemiBold>
                                Add a rejection message
                            </ResText14SemiBold>
                            <Input.TextArea
                                className="comment-textarea"
                                autoSize={{ minRows: 6, maxRows: 10 }}
                            />
                            <ResText10Regular className={"text-red"}>
                                Please provide a rejection message
                            </ResText10Regular>
                        </ResponseAppointment>
                    )}
                </div>
            </Content>
        </Wrapper>
    );
};

export default TutorStatusPage;
