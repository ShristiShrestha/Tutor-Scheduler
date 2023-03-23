import React from "react";
import {
  FileTextOutlined,
  SendOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import "./SideBar.scss";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SideBar = () => {
  const history = useNavigate();

  const changeUrl = (index) => {
    console.log(index);
    if (index.key == "sub3") history("/chat");
    else if (index.key == "sub2") history("/");
    else if (index.key == "sub1") history("/myschedule");
    else history("/");
  };

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
            onClick={changeUrl}
          >
            My Schedule
          </Menu.Item>

          <Menu.Item
            style={{ margin: "10px 0 10px 0" }}
            key="sub2"
            icon={<ShareAltOutlined />}
            onClick={changeUrl}
          >
            Find Tutors
          </Menu.Item>

          <Menu.Item
            style={{ margin: "10px 0 10px 0" }}
            key="sub3"
            icon={<SendOutlined />}
            onClick={changeUrl}
          >
            Chat
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};
export default SideBar;
