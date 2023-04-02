import { Col } from "antd";
import React from "react";
import styled from "styled-components";
import { grey6 } from "../../utils/ShadesUtils";
import NotificationListView from "../../components/ListView/Notification";

const data = Array.from({
    length: 5,
}).map((_, i) => ({
    time: `9:${i}5 AM`,
    name: `Mr. John Doe ${i}`,
    date: "May 10, 2023",
}));

const Wrapper = styled.div``;

const Header = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 48px; // height of main top header - app name
    left: 200px;
    right: 0;
    padding: 0 24px;
    border-bottom: 1px solid ${grey6};

    .ant-row {
        width: 100%;
    }

    .ant-col {
        align-self: center;
    }
`;

const NotificationList = styled.div`
    margin-top: 60px;
    position: relative;
    height: calc(100vh - 112px);
    overflow-y: auto;
    margin-bottom: 120px;
`;

const Notification = () => {
    return (
        <Wrapper>
            <Header>Recent Notification</Header>
            <NotificationList>
                <Col>
                    {data.map((item, index) => (
                        <NotificationListView item={item} />
                    ))}
                </Col>
            </NotificationList>
        </Wrapper>
    );
};

export default Notification;
