import { Checkbox, List, Row, Space, Tag } from "antd";
import React, { useState } from "react";
import { StarOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import "./ListView.scss";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { grey6 } from "../../utils/ShadesUtils";
import {
    ResText10Regular,
    ResText12Regular,
    ResText14Regular,
} from "../../utils/TextUtils";
import { expertises } from "../../static_data/tutors";

const Header = styled.div`
    background-color: rgb(234, 234, 234);
    padding: 12px;
    margin-top: 20px;

    .button-text {
        padding: 7px 19px;
        color: white;
        border-radius: 5px;
        text-align: center;
        font-weight: 600;
        border: transparent;
    }
    .button-green {
        background-color: #1bb885;
    }
    .button-red {
        background-color: #f44336;
    }
    .margin-left {
        margin-left: 40px;
    }
    .block-spacing-left-right {
        margin-left: 7em;
        margin-right: 5em;
    }
`;

const NotificationListView = ({ item }) => {
    return (
        <>
            <Header>
                <Row key={"find-tutors"}>
                    <div className="h-start-flex">
                        <ResText14Regular className="margin-left default-margin-right ">
                            {item.name}
                        </ResText14Regular>
                        <ResText12Regular
                            className={"text-grey3 default-margin-right"}
                        >
                            {item.date}
                        </ResText12Regular>
                        <ResText10Regular
                            className={"text-grey3 default-margin-right"}
                        >
                            {item.time}
                        </ResText10Regular>
                    </div>
                    <div className="default-margin-right block-spacing-left-right">
                        {expertises &&
                            expertises.map(expertise => (
                                <Tag color={"purple"}>
                                    <ResText10Regular>
                                        {expertise}
                                    </ResText10Regular>
                                </Tag>
                            ))}
                    </div>
                    <div>
                        <ResText12Regular className="button-green button-text default-margin-right select-item">
                            Accept
                        </ResText12Regular>
                        <ResText12Regular className="button-red button-text select-item">
                            Reject
                        </ResText12Regular>
                    </div>
                </Row>
            </Header>
        </>
    );
};

export default NotificationListView;
