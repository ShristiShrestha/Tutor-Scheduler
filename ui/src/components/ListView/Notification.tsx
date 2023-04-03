import { Button, List, Tag } from "antd";
import React from "react";
import styled from "styled-components";
import { ResText10Regular, ResText14Regular } from "../../utils/TextUtils";
import { expertises } from "../../static_data/tutors";

const Wrapper = styled.div`
    .button-text {
        padding: 1px;
        color: white;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        width: 8vw;
    }
    .button-green {
        background-color: #1bb885;
    }
    .button-red {
        background-color: #f44336;
    }

    .text-field {
        margin-left: 25px;
    }

    .ant-list-item {
        :hover {
            background: #f8f8f8;
            border-radius: 4px;
            cursor: pointer;
        }
    }
`;

const ListItem = ({ item, onDelete }) => {
    const handleData = key => {
        console.log(key);
        onDelete(item.key);
    };
    return (
        <Wrapper>
            <List.Item>
                <ResText14Regular className={"text-grey1 text-field"}>
                    {item.name}
                </ResText14Regular>
                <ResText14Regular className="text-field text-grey1">
                    {item.date}
                </ResText14Regular>
                <ResText10Regular
                    className="text-field"
                    style={{ marginRight: "140px" }}
                >
                    {item.time}
                </ResText10Regular>

                {expertises &&
                    expertises.map(expertise => (
                        <Tag color={"purple"}>
                            <ResText10Regular>{expertise}</ResText10Regular>
                        </Tag>
                    ))}

                <Button
                    className="button-green button-text"
                    style={{ marginRight: "20px", marginLeft: "95px" }}
                    onClick={() => handleData(item.key)}
                    size={"small"}
                >
                    Accept
                </Button>

                <Button
                    className="button-red button-text text-field"
                    onClick={() => handleData(item.key)}
                    size={"small"}
                >
                    Reject
                </Button>
            </List.Item>
        </Wrapper>
    );
};

const NotificationListView = ({ item, onDelete }) => {
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 8,
                }}
                dataSource={item}
                renderItem={item => (
                    <ListItem item={item} onDelete={onDelete} />
                )}
            />
        </>
    );
};

export default NotificationListView;
