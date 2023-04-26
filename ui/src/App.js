import React, { useCallback, useEffect, useRef } from "react";
import PageRoutes from "./route/PageRoutes";
import TopBar from "./components/TopBar/TopBar";
import { Layout } from "antd";

// import "antd/dist/reset.css";
import "./App.css";
import "./custom_antd.css";
import useAuth from "./hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "./redux/auth/reducer";
import SideBar from "./components/SideBar/SideBar";
import { isLoggedTutor } from "./utils/AuthUtils";
import {
    fetchAppointments,
    fetchNotifications,
} from "./redux/appointment/actions";
import { getAptParams } from "./utils/ScheduleUtils";

const { Header, Content, Sider } = Layout;

const App = () => {
    const dispatch = useDispatch();
    const { authenticated, loggedUser } = useSelector(selectAuth);
    const notificationCallback = useRef(null);

    /******************* use effects  ************************/

    useEffect(() => {
        if (loggedUser && authenticated && isLoggedTutor(loggedUser)) {
            // load when first mounted as well
            dispatchFetchNotifications();

            // @ts-ignore
            notificationCallback.current = setInterval(() => {
                // call your function here
                dispatchFetchNotifications();
            }, 7000);
        }

        // Clear interval on unmount
        return () =>
            notificationCallback && clearInterval(notificationCallback.current);
    }, [loggedUser]);

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

    const dispatchFetchNotifications = useCallback(() => {
        const params = getAptParams(loggedUser);
        dispatch(fetchNotifications(params));
    }, [loggedUser]);

    /******************* internal  ************************/
    const getLayout = child => (
        <Layout>
            <Header className={"app-layout-header centered-flex"}>
                <TopBar />
            </Header>
            {authenticated && (
                <Sider width={210}>
                    <SideBar />
                </Sider>
            )}
            <Content
                className={
                    authenticated
                        ? "app-layout-content"
                        : "app-layout-content-unauth"
                }
            >
                {child}
            </Content>
        </Layout>
    );

    return (
        <>
            {/*{!authenticated && getLayout(*/}
            {/*    <Routes>*/}
            {/*        {publicRoutes.map((item, index) => (*/}
            {/*            <Route*/}
            {/*                key={"public-route-" + index}*/}
            {/*                path={item.path}*/}
            {/*                element={item.component}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </Routes>,*/}
            {/*)}*/}
            {useAuth(getLayout(<PageRoutes />))}
        </>
    );
};
export default App;
