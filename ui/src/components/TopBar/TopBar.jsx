import {Avatar} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {ResText14SemiBold, ResText16SemiBold} from "../../utils/TextUtils";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/auth/reducer";

const Wrapper = styled.div`
  line-height: inherit;
  height: fit-content;
  padding: 24px;
`;

const AppName = styled.div`
  align-self: center;
`;

const UserInfo = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const TopBar = () => {
    const {loggedUser} = useSelector(selectAuth);
    return (
        <Wrapper className={"h-justified-flex"}>
            <AppName>
                <ResText16SemiBold>Online Scheduler</ResText16SemiBold>
            </AppName>
            <UserInfo>
                <Avatar
                    icon={<UserOutlined/>}
                    style={{marginRight: "10px", cursor: "pointer"}}
                />
                <ResText14SemiBold>{(loggedUser && loggedUser["username"]) || `Noname`}</ResText14SemiBold>
                <DownOutlined style={{cursor: "pointer"}}/>
            </UserInfo>
        </Wrapper>
    );
};

export default TopBar;
