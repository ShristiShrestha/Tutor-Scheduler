import {Button, List, Tag} from "antd";
import React from "react";
import styled from "styled-components";
import {ResText10Regular, ResText12Regular, ResText14Regular} from "../../utils/TextUtils";
import {expertises} from "../../static_data/tutors";
import {grey6} from "../../utils/ShadesUtils";

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
    margin-left: 12px;
  }

  .expertise-tags {
    width: fit-content;
    margin-left: 48px;
    display: inline-flex;
  }

  .text-field-date {
    float: right;
    text-align: right;
  }

  .text-field-date2 {
    float: right;
    text-align: right;
    margin-right: 32px;
  }

  .expertise-tag {
    border-radius: 8px;
    background: white;
    border-color: grey;
  }

  .ant-list-item {
    border-bottom: 1px solid ${grey6} !important;

    :hover {
      background: #f8f8f8;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

const ListItem = ({item, onDelete}) => {
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
                <ResText12Regular className="text-field-date text-grey1">
                    {item.date}
                </ResText12Regular>
                <ResText12Regular
                    className="text-field-date2"
                >
                    {item.time}
                </ResText12Regular>

                <div className={"h-start-flex expertise-tags"}>
                    {expertises &&
                        expertises.map(expertise => (
                            <Tag className={"expertise-tag"}>
                                <ResText10Regular>{expertise}</ResText10Regular>
                            </Tag>
                        ))}
                </div>

                <Button
                    className="button-green button-text"
                    style={{marginRight: "20px", marginLeft: "95px"}}
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

const NotificationListView = ({item, onDelete}) => {
    return (
        <Wrapper>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 8,
                }}
                dataSource={item}
                renderItem={item => (
                    <ListItem item={item} onDelete={onDelete}/>
                )}
            />
        </Wrapper>
    );
};

export default NotificationListView;
