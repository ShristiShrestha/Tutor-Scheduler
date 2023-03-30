import React from "react";
import ScheduleCard from "../../components/Card/ScheduleCard";
import { schedule_cards_1, schedule_cards_2 } from "../../static_data/tutors";
import styled from "styled-components";
import { ResText14SemiBold } from "../../utils/TextUtils";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    padding: 24px;

    .schedules-upcoming {
        margin-top: 24px;
        margin-bottom: 24px;
    }
`;

export default function MySchedule() {
    return (
        <Wrapper>
            <ResText14SemiBold>Upcoming Schedule</ResText14SemiBold>
            <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                {schedule_cards_1?.map((item, index) => (
                    <Col xxl={6} lg={8} md={12} sm={24} xs={24}>
                        <Link to={"/my-schedule/" + index}>
                            <ScheduleCard
                                name={item.name}
                                title={item.title}
                                ratings={item.rating}
                                description={item.description}
                                date={item.date}
                                slot={item.slot}
                            />
                        </Link>
                    </Col>
                ))}
            </Row>
            <ResText14SemiBold>All Schedule Requests</ResText14SemiBold>
            <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                {schedule_cards_2?.map((item, index) => (
                    <Col xxl={6} lg={8} md={12} sm={24} xs={24}>
                        <Link to={"/my-schedule/" + index}>
                            <ScheduleCard
                                name={item.name}
                                title={item.title}
                                ratings={item.rating}
                                description={item.description}
                                date={item.date}
                                slot={item.slot}
                            />
                        </Link>
                    </Col>
                ))}
            </Row>
        </Wrapper>
    );
}