import React, {useEffect} from "react";
import ScheduleCard from "../../components/Card/ScheduleCard";
import {schedule_cards_1, schedule_cards_2} from "../../static_data/tutors";
import styled from "styled-components";
import {ResText14SemiBold} from "../../utils/TextUtils";
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import {AppointmentType} from "../../redux/appointment/types";
import {AppointmentStatus} from "../../enum/AppointmentEnum";
import {grey6} from "../../utils/ShadesUtils";
import {useDispatch, useSelector} from "react-redux";
import {fetchAppointments} from "../../redux/appointment/actions";
import {selectAuth} from "../../redux/auth/reducer";

const Wrapper = styled.div`
  .schedules-upcoming {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

const Header = styled.div`
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 48px; // height of main top header - app name
  left: 200px;
  right: 0;
  border-bottom: 1px solid ${grey6};
`

const Content = styled.div`
  padding: 0 24px;
  margin-top: 60px;
  position: relative;
  height: calc(100vh - 112px);
  overflow-y: auto;
  margin-bottom: 120px;
`

const apt: AppointmentType = {
    id: 1,
    studentId: 1,
    tutorId: 1,
    status: AppointmentStatus.ACCEPTED,
    statusMessage: "I am rejecting this because I ma fgul.",
    studentNote: "Need urgent help",
    tutoringOnList: "web,machine learnig,AI",
    scheduledAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 1,
    tutor: "tutor name",
    student: "student name"
}

export default function MySchedule() {
    const dispatch = useDispatch();
    const {loggedUser} = useSelector(selectAuth);

    useEffect(() => {
        dispatch(fetchAppointments())
    }, [])

    return (
        <Wrapper>
            <Header><ResText14SemiBold>Upcoming Schedule</ResText14SemiBold></Header>
            <Content>
                <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                    {schedule_cards_1?.map((item, index) => (
                        <Col xxl={6} lg={8} md={12} sm={24} xs={24}>
                            <Link to={"/schedules/" + index}>
                                <ScheduleCard {...apt}/>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <ResText14SemiBold>All Schedule Requests</ResText14SemiBold>
                <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                    {schedule_cards_2?.map((item, index) => (
                        <Col xxl={6} lg={8} md={12} sm={24} xs={24}>
                            <Link to={"/schedules/" + index}>
                                <ScheduleCard {...apt}/>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Wrapper>
    );
}