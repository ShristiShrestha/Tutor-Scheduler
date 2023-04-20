import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SendOutlined } from "@ant-design/icons";
import { ResText12Regular, ResText12SemiBold } from "../../utils/TextUtils";
import { grey6 } from "../../utils/ShadesUtils";
import { fetchMsgsWithUser, sendMessage } from "../../redux/chat/actions";
import { Avatar, Input, List, Select } from "antd";
import MyButton from "../../components/Button/MyButton";
import { useParams } from "react-router-dom";
import { selectChat } from "../../redux/chat/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/reducer";
import { selectUser } from "../../redux/user/reducer";
import EmptyContent from "../../components/NoContent/EmptyContent";
import { toHourMinStr, toMonthDateYearStr } from "../../utils/DateUtils";
import { UserRoles } from "../../enum/UserEnum";

const Wrapper = styled.div``;

const Message = styled.div`
    padding: 8px;
    border-radius: 8px;
`;

const Header = styled.div`
    height: 56px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${grey6};
`;

const Content = styled.div`
    padding: 0 24px;
    margin-bottom: 120px;

    .header-date {
        margin: 20px 0 5px 2px;
    }

    .ant-input-group.ant-input-group-compact::before {
        display: none;
    }
`;

const ChatCard = styled.div`
    padding: 16px 24px;
    border-radius: 12px;
    border: 1px solid rgb(242, 242, 242);
    margin-top: 12px;
    height: calc(100vh - 250px);
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;

    .input-messagebox {
        position: fixed;
        bottom: 0px;
        background-color: white;
        width: calc(100vw - 300px);
        margin-bottom: 25px;
    }

    .ant-list-item {
        border: none !important;
    }

    .text-area {
        flex: 1;
        resize: none;
        border-radius: 5px 0 0 5px;
    }
`;

export default function ChatConversation() {
    const dispatch = useDispatch();
    const { sender_id } = useParams();
    const { userMessages, usersMessages } = useSelector(selectChat);
    const { loggedUser } = useSelector(selectAuth);
    const { users } = useSelector(selectUser);

    const [loading, setLoading] = useState(true);
    const [msgUser, setMsgUser] = useState(undefined);
    const [inputValue, setInputValue] = useState("");
    const [inputReceiver, setRequestInput] = useState(undefined);

    const handleInputChange = event => {
        if (event.target.value !== "\n") setInputValue(event.target.value);
    };

    const dispatchFetchChat = () => {
        const userObj = Object.values(usersMessages)
            .flat()
            .find(obj => obj.id === parseInt(sender_id));
        if (userObj) {
            let email =
                userObj.senderEmail === loggedUser.email
                    ? userObj.receiverEmail
                    : userObj.senderEmail;

            dispatch(fetchMsgsWithUser(email));
        } else {
            setMsgUser(undefined);
        }
        setLoading(false);
    };

    useEffect(() => {
        dispatchFetchChat();
        const interval = setInterval(() => {
            dispatchFetchChat();
        }, 2000);

        return () => clearInterval(interval);
    }, [fetchMsgsWithUser]);

    useMemo(() => {
        if (sender_id == "1") setMsgUser(undefined);
        else if (userMessages) {
            let convertedData = userMessages.map((item, index) => ({
                id: index + 1,
                message: item.message,
                username: item.receiverEmail,
                date: item.sentAt,
                sender: item.senderEmail === loggedUser.email ? "me" : "other",
            }));
            convertedData = convertedData.map(user => {
                const matchingUser = users.find(u => u.email === user.username);
                return {
                    ...user,
                    name: matchingUser ? matchingUser.name : null,
                };
            });
            setMsgUser(convertedData);
        }
    }, [userMessages]);

    const postMsg = () => {
        const msg = {
            message: inputValue,
            senderEmail: loggedUser.email,
            receiverEmail: userMessages.length
                ? userMessages[0].senderEmail === loggedUser.email
                    ? userMessages[0].receiverEmail
                    : userMessages[0].senderEmail
                : inputReceiver,
        };
        setInputValue("");
        dispatch(sendMessage(msg));
    };

    const getUserData = () => {
        if (users && loggedUser) {
            let filteredUser;
            if (loggedUser.roles[0].name === UserRoles.MODERATOR)
                filteredUser = users.filter(item => {
                    return item.roles.some(
                        role => role.name !== UserRoles.MODERATOR,
                    );
                });
            else
                filteredUser = users.filter(item => {
                    return item.roles.some(
                        role => role.name === UserRoles.MODERATOR,
                    );
                });

            let existingUser = Object.keys(usersMessages).map(
                item => item.split(",")[0],
            );

            let users1 = filteredUser.filter(
                item => !existingUser.includes(item.email),
            );
            return users1.map(item => {
                return {
                    label: item.name + " <" + item.email + "> ",
                    value: item.email,
                    key: item.email,
                };
            });
        }
        return [];
    };

    const renderItem = item => {
        return (
            <div>
                {msgUser?.length > 0 ? (
                    <List
                        dataSource={msgUser}
                        bordered={false}
                        renderItem={(message, index) => (
                            <List.Item
                                style={{
                                    // flexDirection: "column",
                                    alignItems:
                                        message && message.sender === "me"
                                            ? "flex-end"
                                            : "flex-start",
                                    flexDirection:
                                        message && message.sender === "me"
                                            ? "row-reverse"
                                            : "row",
                                }}
                            >
                                <div
                                    style={{
                                        // flexDirection: "column",
                                        alignItems:
                                            message && message.sender !== "me"
                                                ? "flex-end"
                                                : "flex-start",
                                        flexDirection:
                                            message && message.sender !== "me"
                                                ? "row-reverse"
                                                : "row",
                                    }}
                                >
                                    {index === 0 ||
                                    (message &&
                                        message.sender !==
                                            msgUser[index - 1].sender) ? (
                                        <Avatar />
                                    ) : null}

                                    {index === 0 ||
                                    message.sender !==
                                        msgUser[index - 1].sender ? (
                                        <Message
                                            style={{
                                                marginTop: "-35px",
                                            }}
                                        >
                                            <ResText12Regular>
                                                <ResText12Regular
                                                    style={{
                                                        padding: "12px",
                                                        backgroundColor:
                                                            message.sender ===
                                                            "me"
                                                                ? "#e6f7ff"
                                                                : "#f5f5f5",
                                                        marginRight:
                                                            message.sender ===
                                                            "me"
                                                                ? "8px"
                                                                : "8px",
                                                        marginLeft:
                                                            message.sender ===
                                                            "me"
                                                                ? "40px"
                                                                : "30px",
                                                    }}
                                                >
                                                    {message.message}
                                                </ResText12Regular>
                                                {toMonthDateYearStr(
                                                    new Date(message.date),
                                                )}
                                                ,{" "}
                                                {toHourMinStr(
                                                    new Date(message.date),
                                                )}
                                            </ResText12Regular>
                                        </Message>
                                    ) : (
                                        <Message
                                            style={{
                                                backgroundColor:
                                                    message.sender === "me"
                                                        ? "#e6f7ff"
                                                        : "#f5f5f5",
                                                marginRight:
                                                    message.sender === "me"
                                                        ? "8px"
                                                        : "120px",
                                                marginLeft:
                                                    message.sender === "me"
                                                        ? "45px"
                                                        : "8px",
                                            }}
                                        >
                                            <ResText12Regular>
                                                {message.message}
                                            </ResText12Regular>
                                        </Message>
                                    )}
                                </div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <EmptyContent
                        className={"empty-content"}
                        showEmptyIcon={true}
                        desc={"Start a new conversation"}
                    />
                )}
            </div>
        );
    };
    const handleReqInput = (key, value) => {
        setRequestInput(value);
    };

    return (
        <Wrapper>
            <Header className={"h-justified-flex"}>
                {msgUser && msgUser.length ? (
                    `Chat - ${msgUser[0].name}`
                ) : (
                    <Select
                        allowClear
                        style={{ width: "20%" }}
                        placeholder="Select coordinator..."
                        onChange={value => handleReqInput("coordinator", value)}
                        options={getUserData()}
                    />
                )}
            </Header>
            <Content>
                <div className={"header-date"}>
                    {msgUser && msgUser.length > 0 ? (
                        <ResText12Regular>Showing Since </ResText12Regular>
                    ) : null}
                    <ResText12SemiBold>
                        {msgUser && msgUser.length > 0
                            ? toMonthDateYearStr(new Date(msgUser[0].date))
                            : null}
                        {/* {msgUser.lengthtoMonthDateYearStr(new Date(msgUser[0].date))} */}
                    </ResText12SemiBold>
                </div>
                <ChatCard>
                    {msgUser && renderItem(msgUser)}
                    <div className="input-messagebox">
                        <Input.Group
                            compact
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <Input.TextArea
                                className={"text-area"}
                                rows={2}
                                value={inputValue}
                                onChange={handleInputChange}
                                onPressEnter={() => postMsg()}
                                placeholder="Press enter to send ..."
                            />
                            <MyButton
                                type="primary"
                                style={{ borderRadius: "0 5px 5px 0" }}
                                htmlType="submit"
                                onClick={() => postMsg()}
                            >
                                Send <SendOutlined />
                            </MyButton>
                        </Input.Group>
                    </div>
                </ChatCard>
            </Content>
        </Wrapper>
    );
}
