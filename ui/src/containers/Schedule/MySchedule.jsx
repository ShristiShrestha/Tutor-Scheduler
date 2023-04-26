import React, { useCallback, useEffect } from "react";
import ScheduleCard from "../../components/Card/ScheduleCard";
import styled from "styled-components";
import {
    ResText12SemiBold,
    ResText14Regular,
    ResText14SemiBold,
} from "../../utils/TextUtils";
import { Col, Row, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { grey6 } from "../../utils/ShadesUtils";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/reducer";
import { isLoggedTutor } from "../../utils/AuthUtils";
import { selectAppointment } from "../../redux/appointment/reducer";
import EmptyContent from "../../components/NoContent/EmptyContent";
import MyButton from "../../components/Button/MyButton";
import { selectAllLoading } from "../../redux/allLoadings/reducer";
import { FETCH_APPOINTMENTS } from "../../redux/appointment/types";
import { getAptParams } from "../../utils/ScheduleUtils";
import { fetchAppointments } from "../../redux/appointment/actions";

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
    left: 210px;
    right: 0;
    border-bottom: 1px solid ${grey6};
`;

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
`;

export default function MySchedule() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loggedUser } = useSelector(selectAuth);
    const { upcomingAppointments, otherAppointments } =
        useSelector(selectAppointment);
    const isTutor = isLoggedTutor(loggedUser);
    const loading = useSelector(selectAllLoading)[FETCH_APPOINTMENTS];

    const noAptsDesc = isTutor
        ? "You have not accepted any scheduled requests yet. \nCheck if you have any pending requests."
        : "There are no scheduled requests.\nFind tutors and request a schedule for tutoring.";
    const onEmptyNavigateTo = isTutor ? "/notifications" : "/find-tutors";
    const onEmptyNavigateToBtn = isTutor
        ? "Go to notifications"
        : "Find tutors";

    /******************* use effects  ************************/

    useEffect(() => {
        if (loggedUser) dispatchFetchApts();
    }, [loggedUser]);

    /******************* dispatch ************************/

    const dispatchFetchApts = useCallback(() => {
        const upcomingParams = getAptParams(loggedUser, true);
        const allParams = getAptParams(loggedUser);
        // @ts-ignore
        dispatch(fetchAppointments(upcomingParams));
        // @ts-ignore
        dispatch(fetchAppointments(allParams));
    }, [loggedUser]);

    return (
        <Wrapper>
            <Header>
                <ResText14SemiBold className={"text-grey1"}>
                    My Schedules
                </ResText14SemiBold>
            </Header>
            <Spin spinning={loading}>
                <Content>
                    {upcomingAppointments.length > 0 && (
                        <ResText14Regular>
                            Upcoming Schedules ({upcomingAppointments.length})
                        </ResText14Regular>
                    )}
                    {upcomingAppointments.length > 0 ? (
                        <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                            {upcomingAppointments?.map((item, index) => (
                                <Col
                                    key={
                                        "accepted-upcoming-apts-key-" + item.id
                                    }
                                    xxl={6}
                                    xl={8}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <Link to={"/schedules/" + item.id}>
                                        <ScheduleCard
                                            loggedUserId={loggedUser.id}
                                            apt={item}
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    ) : otherAppointments.length === 0 ? (
                        <EmptyContent
                            className={"empty-content"}
                            showEmptyIcon={true}
                            desc={noAptsDesc}
                            action={
                                <MyButton
                                    type={"primary"}
                                    onClick={() => navigate(onEmptyNavigateTo)}
                                >
                                    <ResText12SemiBold>
                                        {onEmptyNavigateToBtn}
                                    </ResText12SemiBold>
                                </MyButton>
                            }
                        />
                    ) : (
                        <></>
                    )}

                    {otherAppointments.length > 0 && (
                        <ResText14Regular>
                            {upcomingAppointments.length === 0
                                ? `All Schedule Requests`
                                : `Other Schedule Requests`}{" "}
                            ({otherAppointments.length})
                        </ResText14Regular>
                    )}
                    {otherAppointments.length > 0 ? (
                        <Row gutter={[24, 24]} className={"schedules-upcoming"}>
                            {otherAppointments.map((item, index) => (
                                <Col
                                    key={"other-apts-key-" + item.id}
                                    xxl={6}
                                    xl={8}
                                    lg={12}
                                    md={12}
                                    sm={24}
                                    xs={24}
                                >
                                    <Link to={"/schedules/" + item.id}>
                                        <ScheduleCard
                                            loggedUserId={loggedUser.id}
                                            apt={item}
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <></>
                    )}
                </Content>
            </Spin>
        </Wrapper>
    );
}