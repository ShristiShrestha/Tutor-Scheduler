import React from "react";
import {Route, Routes} from "react-router-dom";
import MySchedule from "../containers/Schedule/MySchedule";
import FindTutors from "../containers/Tutor/FindTutors";
import ScheduleView from "../containers/Schedule/ScheduleView";
import NotificationsPage from "../containers/Notification/NotificationsPage";
import TutorProfile from "../containers/Tutor/TutorProfile";
import Chat from "../containers/Chat/Chat";
import ChatConversation from "../containers/Chat/ChatConversation";
import LoginPage from "../containers/Auth/LoginPage";

const pages = [
    {
        path: "/find-tutors",
        component: <FindTutors/>,
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
        path: "/chat/users/:sender_id",
        component: <ChatConversation/>,
    },
    {
        path: "/notifications",
        component: <NotificationsPage/>,
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
