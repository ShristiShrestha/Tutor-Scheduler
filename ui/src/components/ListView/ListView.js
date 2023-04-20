import { List, Space } from "antd";
import React, { useState } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import "./ListView.scss";
import { ResText14Regular } from "../../utils/TextUtils";
import styled from "styled-components";
import { grey6, yellow } from "../../utils/ShadesUtils";
import { Link } from "react-router-dom";
import { toEndDottedStr } from "../../utils/StringUtils";
import { toHourMinStr, toMonthDateYearStr } from "../../utils/DateUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMsgsReceived } from "../../redux/chat/actions";

const Wrapper = styled.div`
    .anticon svg {
        font-size: 18px;
        cursor: pointer;
        z-index: 1;
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

const ListItem = ({ item }) => {
    const [checked, setChecked] = useState(false);
    const [starred, setStarred] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCheckboxChange = e => {
        setChecked(e.target.checked);
    };

    const handleStarClick = () => {
        setStarred(!starred);
    };
    const navigateChat = id => {
        dispatch(updateMsgsReceived([parseInt(id)]));
        navigate(`/chat/${id}`);
    };

    return (
        // <Link to={`/chat/${item.id}`}>
        <List.Item onClick={() => navigateChat(item.id)}>
            <Space style={{ marginRight: 12 }}>
                {!item.receivedAt && item.unread ? (
                    <div className={"new-unseen small-margin-right"} />
                ) : (
                    ""
                )}

                {starred ? (
                    <StarFilled
                        onClick={handleStarClick}
                        style={{ color: yellow }}
                    />
                ) : (
                    <StarOutlined onClick={handleStarClick} />
                )}
            </Space>
            <ResText14Regular className={"listview-title text-grey1"}>
                {toEndDottedStr(item.name, 5)}
            </ResText14Regular>
            <ResText14Regular className="listview-field text-grey2">
                {toEndDottedStr(item.message, 20)}
            </ResText14Regular>
            <ResText14Regular className="listview-time">
                {toMonthDateYearStr(new Date(item.sentAt))},
                {toHourMinStr(new Date(item.sentAt))}
            </ResText14Regular>
        </List.Item>
        // </Link>
    );
};

const ListView = data => {
    const [starred, setStarred] = useState(false);

    const handleStarClick = () => {
        setStarred(!starred);
    };

    return (
        <Wrapper>
            <div
                style={{
                    // marginLeft: "25px",
                    marginTop: "20px",
                    marginBottom: "10px",
                }}
            >
                <ResText14Regular
                    className={"text-grey1"}
                    style={{ marginRight: "12px" }}
                >
                    Recent
                </ResText14Regular>
                {starred ? (
                    <StarFilled
                        style={{ color: yellow }}
                        onClick={() => handleStarClick()}
                    />
                ) : (
                    <StarOutlined onClick={() => handleStarClick()} />
                )}
            </div>
            <List
                itemLayout="vertical"
                size="large"
                className={""}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 8,
                }}
                dataSource={data.data}
                renderItem={item => <ListItem item={item} />}
            />
        </Wrapper>
    );
};
export default ListView;
