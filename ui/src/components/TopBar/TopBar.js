import { Layout, Avatar } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import "./TopBar.scss";

const { Header } = Layout;

const TopBar = ({ name }) => {
  return (
    <Layout>
      <Header
        className="header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <div
          className="top-bar-content"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="title">Online Scheduler</span>
          <div
            className="user-info"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Avatar
              icon={<UserOutlined />}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <span
              style={{ marginRight: "10px", fontWeight: 600, fontSize: "16px" }}
            >
              Shristi{name}
            </span>
            <DownOutlined style={{ cursor: "pointer" }} />
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default TopBar;
