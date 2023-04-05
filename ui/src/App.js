import React from "react";
import PageRoutes from "./route/PageRoutes";
import TopBar from "./components/TopBar/TopBar";
import {Layout} from "antd";
import {Route, Routes} from "react-router-dom";

// import "antd/dist/reset.css";
import "./App.css";
import "./custom_antd.css";
import useAuth from "./hooks/useAuth";
import LoginPage from "./containers/Auth/LoginPage";
import {useSelector} from "react-redux";
import {selectAuth} from "./redux/auth/reducer";
import SideBar from "./components/SideBar/SideBar";

const {Header, Content, Sider} = Layout;

const publicRoutes = [
    {
        path: "/login",
        component: <LoginPage/>,
    },
];

const App = () => {
    const {authenticated} = useSelector(selectAuth);

    const getLayout = child => (
        <Layout>
            <Header className={"app-layout-header centered-flex"}>
                <TopBar/>
            </Header>
            {/* todo: remove true*/}
            {(authenticated || true) ? (
                <Sider width={200}>
                    <SideBar/>
                </Sider>
            ) : (
                <></>
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
            {/* todo: remove true */}
            {/*{(!authenticated || true) || }*/}
            {getLayout(
                <Routes>
                    {publicRoutes.map((item, index) => (
                        <Route
                            key={"public-route-" + index}
                            path={item.path}
                            element={item.component}
                        />
                    ))}
                </Routes>,
            )}
            {useAuth(getLayout(<PageRoutes/>))}
        </>
    );
};
export default App;
