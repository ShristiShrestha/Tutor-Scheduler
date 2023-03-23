import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../containers/Chat/Chat";
import MySchedule from "../containers/Schedule/MySchedule";
import FindTutors from "../containers/Tutor/FindTutors";

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
        path: "/chat",
        component: <Chat />,
    },
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