import React from "react";
import styled from "styled-components";
import Search from "../../components/Search/Search";
import {ResText14SemiBold} from "../../utils/TextUtils";
import {grey6} from "../../utils/ShadesUtils";
import ListView from "../../components/ListView/ListView";

const Wrapper = styled.div``

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
`
const Content = styled.div`
  padding: 0 24px;
  margin-top: 60px;
  position: relative;
  height: calc(100vh - 112px);
  overflow-y: auto;
  margin-bottom: 120px;
`

export default function Chat() {
    return <Wrapper>
        <Header className={"h-justified-flex"}>
            <ResText14SemiBold>Chat </ResText14SemiBold>
            <Search/>
        </Header>
        <Content>
            <ListView/>
        </Content>
    </Wrapper>;
};