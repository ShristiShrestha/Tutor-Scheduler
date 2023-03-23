import { Breadcrumb, Input, Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import "./Search.scss";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Search = () => {
  const history = useNavigate();

  const handleClick = () => {
    history("/");
  };
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
          {/* <span className="title">Find Tutors</span> */}

          <Breadcrumb>
            <Breadcrumb.Item onClick={handleClick}>Find Tutors</Breadcrumb.Item>
            <Breadcrumb.Item>Tutor #ID 1234</Breadcrumb.Item>
          </Breadcrumb>

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
