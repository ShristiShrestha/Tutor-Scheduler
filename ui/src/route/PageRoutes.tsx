import React from "react";
import {Route, Routes} from "react-router-dom";
import MySchedule from "../containers/Schedule/MySchedule";
import FindTutors from "../containers/Tutor/FindTutors";
import ScheduleView from "../containers/Schedule/ScheduleView";
import TutorSchedule from "../containers/Schedule/TutorSchedule";
import Notification from "../containers/Notification/Notification";
import TutorProfile from "../containers/Tutor/TutorProfile";
import TutorStatusPage from "../containers/Schedule/TutorStatusPage";
import Chat from "../containers/Chat/Chat";
import ChatConversation from "../containers/Chat/ChatConversation";
import LoginPage from "../containers/Auth/LoginPage";

const pages = [
    {
        path: "/find-tutors",
        component: <FindTutors/>,
    },
    {
        path: "/tutor-schedule",
        component: <TutorSchedule/>,
    },
    {
        path: "/tutor-status",
        component: <TutorStatusPage isAccepted={false}/>,
    },
    {
        path: "/schedules",
        component: <MySchedule/>,
    },
    {
        path: "/schedules/:id",
        component: <ScheduleView/>,
    },
    {
        path: "/schedules/:id/rate-tutor",
        component: <ScheduleView/>,
    },
    {
        path: "/chat",
        component: <Chat/>,

    },
    {
        path: "/chat/users/sender_id",
        component: <ChatConversation/>,
    },
    {
        path: "/notification",
        component: <Notification/>,
    },
    {
        path: "/profile/:id",
        component: <TutorProfile/>,
    },
    {
        path: "/profile/:id/details",
        component: <TutorProfile/>,
    },
    {
        path: "/profile/:id/request-tutoring",
        component: <TutorProfile/>,
    },
    {
        path: "/profile/:id/view-tutor-ratings",
        component: <TutorProfile/>,
    },
    {
        path: "/login",
        component: <LoginPage/>,
    },
    {
        path: "/",
        component: <MySchedule/>,
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
