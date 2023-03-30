import React from "react";
import PageRoutes from "./route/PageRoutes";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import "antd/dist/reset.css";
import "./App.css";
import "./custom_antd.css";
import useAuth from "./hooks/useAuth";
import LoginPage from "./containers/Auth/LoginPage";

const { Header, Content, Sider } = Layout;

const publicRoutes = [
    {
        path: "/login",
        component: <LoginPage />,
    },
];

const App = () => {
    const getLayout = child => (
        <Layout>
            <Header className={"app-layout-header centered-flex"}>
                <TopBar />
            </Header>
            <Sider width={200}>
                <SideBar />
            </Sider>
            <Content className={"app-layout-content"}>{child}</Content>
        </Layout>
    );

    return (
        <Router>
            {getLayout(
                <Routes>
                    {publicRoutes.map(item => (
                        <Route path={item.path} element={item.component} />
                    ))}
                </Routes>,
            )}
            {useAuth(getLayout(<PageRoutes />))}
        </Router>
    );
};
export default App;
