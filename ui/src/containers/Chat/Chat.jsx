import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MySearch from "../../components/Search/MySearch";
import {
    ResText12SemiBold,
    ResText14Regular,
    ResText14SemiBold,
    ResText16SemiBold,
} from "../../utils/TextUtils";
import { grey6 } from "../../utils/ShadesUtils";
import ListView from "../../components/ListView/ListView";
import { fetchMsgsWithUsers, sendMessage } from "../../redux/chat/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../../redux/chat/reducer";
import { selectAuth } from "../../redux/auth/reducer";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUsers } from "../../redux/user/actions";
import { selectUser } from "../../redux/user/reducer";
import { PlusOutlined } from "@ant-design/icons";
import MyButton from "../../components/Button/MyButton";
import { Form, Input, Modal, Select } from "antd";
import { UserRoles } from "../../enum/UserEnum";

const Wrapper = styled.div``;
const Header = styled.div`
    height: 56px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 48px; // height of main top header - app name
    left: 210px;
    right: 0;
    border-bottom: 1px solid ${grey6};
`;
const Content = styled.div`
    padding: 12px 24px;
    position: relative;
    top: 60px;
    height: calc(100vh - 112px);
    overflow-y: auto;
    margin-bottom: 120px;
`;

export default function Chat() {
    const dispatch = useDispatch();
    const { loggedUser } = useSelector(selectAuth);
    const { usersMessages, userMessages } = useSelector(selectChat);
    const { users } = useSelector(selectUser);
    const [loading, setLoading] = useState(true);
    const [newMsg, setNewMsg] = useState(false);
    const navigate = useNavigate();
    const [msgUser, setMsgUser] = useState(undefined);
    const [requestInput, setRequestInput] = useState({
        coordinator: "",
        message: "",
    });
    const [modals, setModalOpen] = useState(false);

    const dispatchFetchChat = () => {
        // TODO: a query to fetch all users

        dispatch(fetchUsers("STUDENT"));
        dispatch(fetchUsers("TUTOR"));
        dispatch(fetchUsers("COORDINATOR"));
        setLoading(false);
        dispatch(fetchMsgsWithUsers());
    };

    useEffect(() => {
        dispatchFetchChat();
    }, [fetchMsgsWithUsers]);

    useEffect(() => {
        let msg = Object.values(usersMessages).flat();
        const filterUser = msg.map(item => {
            return {
                ...item,
                email:
                    item.senderEmail === loggedUser.email
                        ? item.receiverEmail
                        : item.senderEmail,
            };
        });

        let uniqueUser = filterUser.reduce((acc, current) => {
            const index = acc.findIndex(item => item.email === current.email);
            if (index === -1) {
                acc.push(current);
            } else if (current.id > acc[index].id) {
                acc[index] = current;
            }
            return acc;
        }, []);

        uniqueUser.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
        uniqueUser = uniqueUser.map(user => {
            const matchingUser = users.find(u => u.email === user.email);
            return {
                ...user,
                unread: matchingUser
                    ? matchingUser.receivedAt == null &&
                      loggedUser.email == user.receiverEmail
                    : false,
                name: matchingUser ? matchingUser.name : null,
            };
        });

        setMsgUser(uniqueUser);
    }, [usersMessages, users]);

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

    const handleReqInput = (key, value) => {
        if (key == "message") value = value.target.value;
        setRequestInput({ ...requestInput, [key]: value });
    };

    const handleSubmit = async () => {
        let msgObj = {
            message: requestInput.message,
            receiverEmail: requestInput.coordinator,
            senderEmail: loggedUser.email,
        };

        setRequestInput("");
        dispatch(sendMessage(msgObj));

        navigate(`/chat/new`, {
            state: {
                receiver: msgObj.receiverEmail,
            },
        });

        setModalOpen(false);
    };

    const newMessages = msgUser?.filter(
        obj => obj.receivedAt === null && obj.unread,
    );
    return (
        <Wrapper>
            <Header className={"h-justified-flex"}>
                <ResText14SemiBold>Chat {newMsg} </ResText14SemiBold>
                <MySearch />
            </Header>
            <Content>
                {newMessages > 0 && (
                    <ResText14Regular style={{ marginLeft: "25px" }}>
                        New messages: ( {newMessages.length} )
                    </ResText14Regular>
                )}
                {msgUser && <ListView data={msgUser} />}

                <MyButton
                    type="primary"
                    htmlType="submit"
                    onClick={() => setModalOpen(true)}
                >
                    {/* <Link to={`/chat/1`}> */}
                    <ResText12SemiBold>
                        Start A New Chat <PlusOutlined />
                    </ResText12SemiBold>
                    {/* </Link> */}
                </MyButton>

                <Modal
                    title={
                        <ResText16SemiBold>Start a New Chat</ResText16SemiBold>
                    }
                    open={modals}
                    footer={false}
                    // onOk={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                >
                    <Form
                        name="basic"
                        layout={"vertical"}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 600 }}
                        className={"large-vertical-margin"}
                        // onFinish={values => handleSubmit(values)}
                        // autoComplete="off"
                    >
                        <Form.Item
                            label={
                                <ResText14Regular className={"text-grey2"}>
                                    Needs tutoring with
                                </ResText14Regular>
                            }
                            name="coordinator"
                            rules={[
                                {
                                    required: true,
                                    message: "Select a co-ordinator!",
                                },
                            ]}
                        >
                            <div
                                className={
                                    "vertical-start-flex select-needs-tutoring-in"
                                }
                            >
                                <Select
                                    allowClear
                                    style={{ width: "95%" }}
                                    placeholder="Select tutoring topics..."
                                    onChange={value =>
                                        handleReqInput("coordinator", value)
                                    }
                                    options={getUserData()}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label={
                                <ResText14Regular className={"text-grey2"}>
                                    Message
                                </ResText14Regular>
                            }
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter your message!",
                                },
                            ]}
                        >
                            <Input.TextArea
                                // className={"text-area"}
                                // rows={2}
                                // value={inputValue}
                                onChange={value =>
                                    handleReqInput("message", value)
                                }
                                placeholder="Type a message..."
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className={"h-end-flex full-width"}>
                                <MyButton
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSubmit}
                                >
                                    Send Message
                                </MyButton>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Wrapper>
    );
}
