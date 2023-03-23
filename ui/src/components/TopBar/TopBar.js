import { Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { ResText14SemiBold } from "../../utils/TextUtils";
import styled from "styled-components";

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

const TopBar = ({ name }) => {
    return (
        <Wrapper className={"h-justified-flex"}>
            <AppName>
                <ResText14SemiBold>Online Scheduler</ResText14SemiBold>
            </AppName>
            <UserInfo>
                <Avatar
                    icon={<UserOutlined />}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <ResText14SemiBold>Shristi{name}</ResText14SemiBold>
                <DownOutlined style={{ cursor: "pointer" }} />
            </UserInfo>
        </Wrapper>
    );
};

export default TopBar;
