import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../containers/Chat/Chat";
import MySchedule from "../containers/Schedule/MySchedule";
import FindTutors from "../containers/Tutor/FindTutors";
import ScheduleView from "../containers/Schedule/ScheduleView";

const pages = [
    {
        path: "/find-tutors",
        component: <FindTutors />,
    },
    {
        path: "/my-schedule",
        component: <MySchedule />,
    },
    {
        path: "/my-schedule/:id",
        component: <ScheduleView />,
    },
    {
        path: "/chat",
        component: <Chat />,
    },
    // {
    //     path: "/login",
    //     component: <LoginPage />,
    // },
    {
        path: "/",
        component: <FindTutors />,
    },
];

export default function PageRoutes() {
    return (
        <Routes>
            {pages.map(item => (
                <Route path={item.path} element={item.component} />
            ))}
        </Routes>
    );
}