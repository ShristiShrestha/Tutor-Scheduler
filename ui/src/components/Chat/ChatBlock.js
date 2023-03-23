import React from "react";
import ListView from "../ListView/ListView";
import { Layout } from "antd";
import "./ChatBlock.scss";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import Search from "../Search/Search";

const ChatBlock = () => {
  const messages = [
    {
      author: "John",
      avatar: "https://i.pravatar.cc/40",
      content: "Hello there!",
    },
    {
      author: "Jane",
      avatar: "https://i.pravatar.cc/40",
      content: "Hi John!",
    },
    {
      author: "John",
      avatar: "https://i.pravatar.cc/40",
      content: "How are you?",
    },
  ];

  return (
    <div>
      <Layout>
        <TopBar />
        <SideBar />
        <Layout>
          <Search />
        </Layout>
        <div className="profile-card">
          <ListView />
          {/* <Chat dataSource={messages} /> */}
        </div>
      </Layout>
    </div>
  );
};

export default ChatBlock;
