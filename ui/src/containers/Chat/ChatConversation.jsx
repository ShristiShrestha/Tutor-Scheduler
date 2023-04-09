import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SendOutlined } from "@ant-design/icons";
import {
    ResText12SemiBold,
    ResText14SemiBold,
    ResText12Regular,
} from "../../utils/TextUtils";
import { grey6 } from "../../utils/ShadesUtils";
import { fetchMsgsWithUser } from "../../redux/chat/actions";
import { messagesData } from "../.././static_data/Chat";
import { List, Avatar, Input } from "antd";
import MyButton from "../../components/Button/MyButton";
import { useParams } from "react-router-dom";
import { selectChat } from "../../redux/chat/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/reducer";

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
    position: fixed;
    top: 48px;
    left: 200px;
    right: 0;
    border-bottom: 1px solid ${grey6};
`;

const Content = styled.div`
    padding: 0px 24px;
    margin-top: 60px;
    position: relative;
    height: calc(100vh - 250px);
    overflow-y: auto;
    margin-bottom: 120px;
`;

const ChatCard = styled.div`
    padding: 16px 24px;
    border-radius: 12px;
    border: 1px solid rgb(242, 242, 242);
    margin-top: 12px;

    .input-messagebox {
        margin-top: 16px;
        position: fixed;
        bottom: 0px;
        height: 100px;
        background-color: white;
        width: 67%;
        margin-bottom: 25px;
    }
    .ant-list-item {
        border: none !important;
    }
`;

export default function ChatConversation() {
    const dispatch = useDispatch();
    const { sender_id } = useParams();
    const { userMessages } = useSelector(selectChat);
    const { loggedUser } = useSelector(selectAuth);

    const [loading, setLoading] = useState(true);
    const [msgUser, setMsgUser] = useState(undefined);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const dispatchFetchChat = () => {
        dispatch(fetchMsgsWithUser(sender_id));
        setLoading(false);
    };

    useEffect(() => {
        dispatchFetchChat();
        if (!!userMessages && !msgUser) {
            const convertedData = userMessages.map((item, index) => ({
                id: index + 1,
                message: item.message,
                username: item.receiverEmail,
                date: item.sentAt,
                sender: item.senderEmail === loggedUser.email ? "me" : "other",
            }));
            setMsgUser(convertedData);
        }
    }, [fetchMsgsWithUser]);

    const handleSendMessage = () => {
        const newMessage = {
            message: inputValue,
            sender: "user",
        };
        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    const renderItem = item => {
        const isSender = item.username === "sender";
        return (
            <List
                dataSource={msgUser}
                bordered={false}
                renderItem={(message, index) => (
                    <List.Item
                        style={{
                            flexDirection: "column",
                            alignItems:
                                message.sender !== "me"
                                    ? "flex-end"
                                    : "flex-start",
                            flexDirection:
                                message.sender !== "me" ? "row-reverse" : "row",
                        }}
                    >
                        <div
                            style={{
                                flexDirection: "column",
                                alignItems:
                                    message.sender !== "me"
                                        ? "flex-end"
                                        : "flex-start",
                                flexDirection:
                                    message.sender !== "me"
                                        ? "row-reverse"
                                        : "row",
                            }}
                        >
                            {index === 0 ||
                            message.sender !==
                                messagesData[index - 1].sender ? (
                                <Avatar
                                    src={`https://i.pravatar.cc/150?u=${message.sender}`}
                                />
                            ) : null}

                            {index === 0 ||
                            message.sender !==
                                messagesData[index - 1].sender ? (
                                <Message
                                    style={{
                                        marginTop: "-35px",
                                        backgroundColor:
                                            message.sender === "me"
                                                ? "#e6f7ff"
                                                : "#f5f5f5",
                                        marginRight:
                                            message.sender === "me"
                                                ? "8px"
                                                : "40px",
                                        marginLeft:
                                            message.sender === "me"
                                                ? "40px"
                                                : "8px",
                                    }}
                                >
                                    <ResText12Regular>
                                        {message.message}
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
                                                : "40px",
                                        marginLeft:
                                            message.sender === "me"
                                                ? "40px"
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
        );
    };

    return (
        <Wrapper>
            <Header className={"h-justified-flex"}>
                <ResText14SemiBold>Chat - {sender_id}</ResText14SemiBold>
            </Header>
            <Content>
                <ChatCard>
                    <ResText12Regular>Showing Since</ResText12Regular>{" "}
                    <ResText12SemiBold>Jan 10, 2022</ResText12SemiBold>
                    <List
                        itemLayout="horizontal"
                        dataSource={messagesData}
                        renderItem={renderItem}
                    />
                    <div className="input-messagebox">
                        <Input.Group
                            compact
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <Input.TextArea
                                style={{
                                    flex: 1,
                                    resize: "none",
                                    borderRadius: "5px 0 0 5px",
                                }}
                                rows={2}
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Type a message..."
                            />
                            <MyButton
                                type="primary"
                                style={{ borderRadius: "0 5px 5px 0" }}
                                htmlType="submit"
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
