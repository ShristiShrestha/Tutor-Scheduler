import React from "react";
import PageRoutes from "./route/PageRoutes";
import TopBar from "./components/TopBar/TopBar";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import "antd/dist/reset.css";
import "./App.css";
import "./custom_antd.css";
import useAuth from "./hooks/useAuth";
import LoginPage from "./containers/Auth/LoginPage";
import SideBar from "./components/SideBar/SideBar";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/auth/reducer";

const { Header, Content, Sider } = Layout;

const publicRoutes = [
    {
        path: "/login",
        component: <LoginPage />,
    },
];

const App = () => {
    const { authenticated } = useSelector(selectAuth);

    const getLayout = child => (
        <Layout>
            <Header className={"app-layout-header centered-flex"}>
                <TopBar />
            </Header>
            {authenticated ? (
                <Sider width={200}>
                    <SideBar />
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
        <Router>
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
            {useAuth(getLayout(<PageRoutes />))}
        </Router>
    );
};
export default App;
