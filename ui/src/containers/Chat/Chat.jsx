import React from "react";
import styled from "styled-components";
import Search from "../../components/Search/Search";
import {ResText16SemiBold} from "../../utils/TextUtils";
import {grey6} from "../../utils/ShadesUtils";
import ListView from "../../components/ListView/ListView";

const Wrapper = styled.div``
const Header = styled.div`
  padding: 12px 24px;
  align-items: center;
  border-bottom: 1px solid ${grey6};
`
const Content = styled.div``

export default function Chat() {
    return <Wrapper>
        <Header className={"h-justified-flex"}>
            <ResText16SemiBold>Chat </ResText16SemiBold>
            <Search/>
        </Header>
        <Content>
            <ListView/>
        </Content>
    </Wrapper>;
};