import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../containers/Chat/Chat";
import MySchedule from "../containers/Schedule/MySchedule";
import FindTutors from "../containers/Tutor/FindTutors";
import ScheduleView from "../containers/Schedule/ScheduleView";
import TutorSchedule from "../containers/Schedule/TutorSchedule";
import Notification from "../containers/Notification/notification";
import TeacherProfileInfo from "../components/Profile/TeacherProfile";
import TutorStatusPage from "../containers/Schedule/TutorStatusPage";

const pages = [
    {
        path: "/find-tutors",
        component: <FindTutors />,
    },
    {
        path: "/tutor-schedule",
        component: <TutorSchedule />,
    },
    {
        path: "/tutor-status",
        component: <TutorStatusPage isAccepted={false} />,
    },
    {
        path: "/schedules",
        component: <MySchedule />,
    },
    {
        path: "/schedules/:id",
        component: <ScheduleView />,
    },
    {
        path: "/schedules/:id/rate-tutor",
        component: <ScheduleView />,
    },
    {
        path: "/chat",
        component: <Chat />,
    },
    {
        path: "/",
        component: <MySchedule />,
    },
    {
        path: "/notification",
        component: <Notification />,
    },
    {
        path: "/profile/:id",
        component: <TeacherProfileInfo />,
    },
];

export default function PageRoutes() {
    return (
        <Routes>
            {pages.map((item, index) => (
                <Route
                    key={"inside-route" + index}
                    path={item.path}
                    element={item.component}
                />
            ))}
        </Routes>
    );
}
