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

    const [loading, setLoading] = useState(true);
    const [msgUser, setMsgUser] = useState(undefined);

    const dispatchFetchChat = () => {
        dispatch(fetchMsgsWithUsers());
        setLoading(false);
    };

    useEffect(() => {
        dispatchFetchChat();
        if (!!Object.keys(usersMessages) && !!loggedUser) {
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

            const uniqueUser = filterUser.reduce((finalArr, current) => {
                let obj = finalArr.find(item => item.email === current.email);
                if (obj) return finalArr;
                return finalArr.concat([current]);
            }, []);

            setMsgUser(uniqueUser);
        }
    }, [fetchMsgsWithUsers]);

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
