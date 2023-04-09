import React from "react";
import "./Search.scss";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const MySearch = ({value, onChange, onSearch}) => {
    return (
        <Input
            // value={value}
            prefix={<SearchOutlined/>}
            className="search-tutors"
            placeholder="MySearch for ..."
            onChange={onChange}
            onPressEnter={onSearch}
            // style={{ width: 500, padding: 24 }}
        />
    );
};

export default MySearch;
