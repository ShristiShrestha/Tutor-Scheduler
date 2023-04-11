import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MySearch from "../../components/Search/MySearch";
import { ResText14SemiBold } from "../../utils/TextUtils";
import { grey6 } from "../../utils/ShadesUtils";
import ListView from "../../components/ListView/ListView";
import { fetchMsgsWithUsers } from "../../redux/chat/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../../redux/chat/reducer";
import { selectAuth } from "../../redux/auth/reducer";
import { fetchUsers } from "../../redux/user/actions";
import { selectUser } from "../../redux/user/reducer";

const Wrapper = styled.div``;

const Header = styled.div`
    height: 56px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 48px; // height of main top header - app name
    left: 200px;
    right: 0;
    border-bottom: 1px solid ${grey6};
`;
const Content = styled.div`
    padding: 0 24px;
    margin-top: 60px;
    position: relative;
    height: calc(100vh - 112px);
    overflow-y: auto;
    margin-bottom: 120px;
`;

export default function Chat() {
    const dispatch = useDispatch();
    const { loggedUser } = useSelector(selectAuth);
    const { usersMessages } = useSelector(selectChat);
    const { users } = useSelector(selectUser);
    const [loading, setLoading] = useState(true);
    const [msgUser, setMsgUser] = useState(undefined);

    const dispatchFetchChat = () => {
        // TODO: a query to fetch all users
        dispatch(fetchUsers("TUTOR"));
        dispatch(fetchUsers("STUDENT"));
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
                name: matchingUser ? matchingUser.name : null,
            };
        });
        setMsgUser(uniqueUser);
    }, [usersMessages, users]);

    return (
        <Wrapper>
            <Header className={"h-justified-flex"}>
                <ResText14SemiBold>Chat </ResText14SemiBold>
                <MySearch />
            </Header>
            <Content>{msgUser && <ListView data={msgUser} />}</Content>
        </Wrapper>
    );
}
