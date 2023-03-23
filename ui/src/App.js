import React from "react";

import myStore from "./redux/store";
import { Provider } from "react-redux";
import PageRoutes from "./route/PageRoutes";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";

// import "antd/dist/reset.css";
import "./App.css";
import "./custom_antd.css";

const { Header, Content, Sider } = Layout;

const App = () => {
    return (
        <Provider store={myStore}>
            <Router>
                <Layout>
                    <Header className={"app-layout-header centered-flex"}>
                        <TopBar />
                    </Header>
                    <Sider width={200}>
                        <SideBar />
                    </Sider>
                    <Content className={"app-layout-content"}>
                        <PageRoutes />
                    </Content>
                </Layout>
            </Router>
        </Provider>
    );
};
export default App;
