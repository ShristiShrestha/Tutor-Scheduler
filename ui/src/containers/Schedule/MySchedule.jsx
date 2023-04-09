import React, {useCallback, useEffect, useState} from "react";
import ScheduleCard from "../../components/Card/ScheduleCard";
import styled from "styled-components";
import {ResText12Regular, ResText14Regular, ResText14SemiBold} from "../../utils/TextUtils";
import {Col, Row, Spin} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {AppointmentParams} from "../../redux/appointment/types";
import {grey6} from "../../utils/ShadesUtils";
import {useDispatch, useSelector} from "react-redux";
import {fetchAppointments} from "../../redux/appointment/actions";
import {selectAuth} from "../../redux/auth/reducer";
import {isLoggedTutor} from "../../utils/AuthUtils";
import {selectAppointment} from "../../redux/appointment/reducer";
import EmptyContent from "../../components/NoContent/EmptyContent";
import MyButton from "../../components/Button/MyButton";

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
  padding: 12px 24px;
  margin-top: 60px;
  position: relative;
  height: calc(100vh - 112px);
  overflow-y: auto;
  margin-bottom: 120px;

  .empty-content {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`

export default function MySchedule() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {loggedUser} = useSelector(selectAuth);
    const {upcomingAppointments, otherAppointments} = useSelector(selectAppointment);

    const getAptParams = (upcoming?: boolean): AppointmentParams => {
        const today = new Date();
        // const month = calendarIntToMonth[today.getMonth()];
        const year = today.getFullYear();
        const isTutor = isLoggedTutor(loggedUser);
        return {
            // apts with this tutor
            tutorId: loggedUser && isTutor ? loggedUser.id : null,
            // apts created by this logged user as a student
            studentId: loggedUser && !isTutor ? loggedUser.id : null,
            // fetch all apt reqs for this year
            year: `${year}`,
            // filter if upcoming only (irrespective of status)
            upcoming: upcoming
        }
    }

    const fetchApts = useCallback(() => {
        const upcomingParams = getAptParams(true);
        const allParams = getAptParams();
        dispatch(fetchAppointments(upcomingParams));
        dispatch(fetchAppointments(allParams));
        setLoading(false);
    }, [dispatch]); // will create function inside callback only if dispatch has changed

    useEffect(() => {
        fetchApts();
    }, [fetchApts]); // will call fetchApts if fetchApts function has changed

    return (
        <Wrapper>
            <Header><ResText14SemiBold className={"text-grey1"}>My Appointments</ResText14SemiBold></Header>
            <Spin spinning={loading}>
                <Content>
                    {upcomingAppointments.length > 0 ? <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                        {upcomingAppointments?.map((item, index) => (
                            <Col key={"acpted-upcoming-apts-key-" + item.id}
                                 xxl={6} xl={8} lg={8} md={12} sm={24} xs={24}>
                                <Link to={"/schedules/" + item.id}>
                                    <ScheduleCard {...item}/>
                                </Link>
                            </Col>
                        ))}
                    </Row> : otherAppointments.length === 0 ? <EmptyContent title={"Upcoming appointments"}
                                                                            className={"empty-content"}
                                                                            showEmptyIcon={true}
                                                                            desc={"You have no accepted upcoming appointments. Find tutors and request an appointment."}
                                                                            action={<MyButton type={"primary"}
                                                                                              onClick={() => navigate("/find-tutors")}><ResText12Regular>Find
                                                                                tutors</ResText12Regular></MyButton>}
                    /> : <></>}


                    {otherAppointments &&
                        <ResText14Regular>{upcomingAppointments.length === 0 ? "All Appointments" : "Other Appointments"}</ResText14Regular>}
                    {otherAppointments && otherAppointments.length > 0 ?
                        <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                            {otherAppointments.map((item, index) => (
                                <Col key={"other-apts-key-" + item.id}
                                     xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                                    <Link to={"/schedules/" + item.id}>
                                        <ScheduleCard {...item}/>
                                    </Link>
                                </Col>
                            ))}
                        </Row> : <></>}
                </Content>
            </Spin>
        </Wrapper>
    );
}