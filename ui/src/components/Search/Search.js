import { Typography, Input, Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import "./Search.scss";

const { Header } = Layout;

const Search = () => {
  return (
    <>
      <Header
        className="header-top"
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          marginLeft: "200px",
        }}
      >
        <div
          className="top-bar"
          style={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="title">Find Tutors</span>

          <Input
            prefix={<SearchOutlined />}
            className="search-icon"
            placeholder="   Search for ..."
            // onPressEnter={onSearch}
            style={{ width: 500, marginLeft: 300, padding: 15 }}
          />
        </div>
      </Header>
    </>
  );
};

export default Search;
