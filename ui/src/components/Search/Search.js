import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import "./Search.scss";

const Search = () => {
    return (
        <Input
            prefix={<SearchOutlined />}
            className="search-tutors"
            placeholder="Search for ..."

            // onPressEnter={onSearch}
            // style={{ width: 500, padding: 24 }}
        />
    );
};

export default Search;
