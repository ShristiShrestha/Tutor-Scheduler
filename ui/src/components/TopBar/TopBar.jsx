import {Avatar, Dropdown, Menu, Tag} from "antd";
import {DownOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {ResText12Regular, ResText14SemiBold, ResText16SemiBold,} from "../../utils/TextUtils";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/auth/reducer";
import {useNavigate} from "react-router-dom";
import {capitalize} from "../../utils/StringUtils";
import {logout} from "../../api/AuthApi";
import {AlertType, openNotification} from "../../utils/Alert";
import React from "react";
import {setAuth} from "../../redux/auth/actions";
import {isLoggedModerator} from "../../utils/AuthUtils";

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
  cursor: pointer;

  .ant-btn-compact-item {
    background: none;
    border: none;
    padding-right: 12px;
  }

  .user-avatar-menu-item {
    min-width: 160px !important;
  }
`;

const TopBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loggedUser, authenticated} = useSelector(selectAuth);

    const handleLogout = () => {
        logout()
            .then(res => {
                dispatch(setAuth());
                return navigate("/login")
            })
            .catch(err =>
                openNotification("Logout failed", err, AlertType.ERROR),
            );
    };

    const avatarMenu = (
        <Menu>
            <Menu.Item
                className={"user-avatar-menu-item"}
                onClick={() => handleLogout()}
            >
                <>
                    <ResText12Regular>Logout</ResText12Regular>
                    <LogoutOutlined style={{marginLeft: 8}}/>
                </>
            </Menu.Item>
        </Menu>
    );

    const titleClickUrl = isLoggedModerator(loggedUser) ? "/find-tutors" : "/";

    return (
        <Wrapper className={"h-justified-flex"}>
            {authenticated && (
                <>
                    <AppName onClick={() => navigate(titleClickUrl)}>
                        <ResText16SemiBold>Online Scheduler</ResText16SemiBold>
                    </AppName>
                    <UserInfo>
                        <Dropdown.Button
                            style={{
                                display: "flow-root",
                                color: "white",
                            }}
                            icon={<DownOutlined style={{color: "white"}}/>}
                            trigger={["click"]}
                            overlay={avatarMenu}
                        >
                            <div className={"h-vertically-centered-flex"}>
                                <Tag className={"text-white default-margin-right"}>{loggedUser.roles[0].name}</Tag>
                                <Avatar
                                    icon={<UserOutlined/>}
                                    style={{
                                        marginRight: "12px",
                                        cursor: "pointer",
                                    }}
                                />
                                <ResText14SemiBold className={"text-white"}>
                                    {(loggedUser &&
                                            capitalize(loggedUser["name"])) ||
                                        `Noname`}
                                </ResText14SemiBold>
                            </div>
                        </Dropdown.Button>
                    </UserInfo>
                </>
            )}
        </Wrapper>
    );
};

export default TopBar;
