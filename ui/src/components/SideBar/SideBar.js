import React from "react";
import {
  FileTextOutlined,
  SendOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import "./SideBar.scss";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideBar = () => {
  return (
    <Layout style={{ marginTop: 65 }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          expandIcon=""
          defaultSelectedKeys={["sub2"]}
          defaultOpenKeys={["sub2"]}
          style={{
            position: "fixed",
            left: 0,
            top: 64,
            height: "100vh",
            width: 200,
          }}
        >
          <Menu.Item
            style={{ margin: "10px 0 10px 0" }}
            key="sub1"
            icon={<FileTextOutlined />}
          >
            My Schedule
          </Menu.Item>

          <Menu.Item
            style={{ margin: "10px 0 10px 0" }}
            key="sub2"
            icon={<ShareAltOutlined />}
          >
            Find Tutors
          </Menu.Item>

          <Menu.Item
            style={{ margin: "10px 0 10px 0" }}
            key="sub3"
            icon={<SendOutlined />}
          >
            Chat
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};
export default SideBar;
