import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {ResText14SemiBold, ResText16SemiBold} from "../../utils/TextUtils";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/auth/reducer";
import {useNavigate} from "react-router-dom";
import {capitalize} from "../../utils/StringUtils";

const Wrapper = styled.div`
  line-height: inherit;
  height: fit-content;
  padding: 24px;
`;

const AppName = styled.div`
  align-self: center;
  cursor: pointer;
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
    const navigate = useNavigate();
    const {loggedUser} = useSelector(selectAuth);

    return (
        <Wrapper className={"h-justified-flex"}>
            <AppName onClick={() => navigate("/")}>
                <ResText16SemiBold>Online Scheduler</ResText16SemiBold>
            </AppName>
            <UserInfo>
                <Avatar
                    icon={<UserOutlined/>}
                    style={{marginRight: "10px", cursor: "pointer"}}
                />
                <ResText14SemiBold>{(loggedUser && capitalize(loggedUser["name"])) || `Noname`}</ResText14SemiBold>
            </UserInfo>
        </Wrapper>
    );
};

export default TopBar;
