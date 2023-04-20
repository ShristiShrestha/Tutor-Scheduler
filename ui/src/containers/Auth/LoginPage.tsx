import React, { useState } from "react";
import styled from "styled-components";
import { amethyst } from "../../utils/ShadesUtils";
import {
    Header4,
    ResText14Regular,
    ResText16Regular,
    ResText16SemiBold,
} from "../../utils/TextUtils";
import MyButton from "../../components/Button/MyButton";
import { Form, Input, Modal } from "antd";
import { capitalize } from "../../utils/StringUtils";
import { authenticate, login, signup } from "../../api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AlertType, openNotification } from "../../utils/Alert";
import { setAuth } from "../../redux/auth/actions";
import { selectAuth } from "../../redux/auth/reducer";

const Wrapper = styled.div`
    background: ${amethyst};
    width: 100vw;
    height: calc(100vh - 48px);
    overflow: hidden;
`;

const LandingCard = styled.div`
    //background: white;
    padding: 24px;
    max-width: 600px;
    max-height: 500px;
    margin: auto;
    border: 1px solid ${amethyst};
    border-radius: 4px;
    row-gap: 12px;

    color: white;
`;

export default function LoginPage() {
    const [modals, setModalOpen] = useState({ login: false, signup: false });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authenticated } = useSelector(selectAuth);
    const handleModal = (item, action) => {
        setModalOpen({ ...modals, [item]: action });
    };

    const handleProfile = res => {
        // const roles = res["roles"]
        // const userMiniDetails: UserMiniDetailsType = {
        //     username: res["username"],
        //     email: res["username"],
        //     roles: Object.values(UserRoles).filter(item => roles.includes(item))
        // }
        // @ts-ignore
        dispatch(setAuth(res));
        return navigate("/");
    };

    const handleErr = (item, err) =>
        openNotification("Error on " + capitalize(item), err, AlertType.ERROR);

    // successful auth: todo:
    // tutor, student => schedules page by default
    // moderator => chat
    const handleSubmit = (item, formInput) => {
        if (formInput["email"] && !formInput["email"].includes("@lsu.edu")) {
            return openNotification(
                "Invalid email",
                "Make sure your email is associated with LSU account.",
                AlertType.WARNING,
            );
        }
        switch (item) {
            case "login":
                login(formInput)
                    .then(res => {
                        authenticate()
                            .then(res1 => handleProfile(res1))
                            .catch(err => handleErr("login", err));
                    })
                    .catch(err => {
                        openNotification(
                            "Error on " + capitalize(item),
                            err,
                            AlertType.ERROR,
                        );
                    });
                break;
            case "signup":
                signup(formInput)
                    .then(res => {
                        authenticate()
                            .then(res1 => handleProfile(res1))
                            .catch(err => handleErr("sign up", err));
                    })
                    .catch(err => handleErr("signup", err));
                break;
            default:
                alert("Invalid actions.");
        }
    };

    if (authenticated) navigate("/");

    return (
        <Wrapper>
            <LandingCard className={"h-centered-flex"}>
                <Header4 className={"text-white"}>
                    Online Tutor Scheduler
                </Header4>
                <ResText16Regular>
                    <u>Find</u> Tutors of your <u>choice</u>
                </ResText16Regular>

                <MyButton
                    style={{ marginTop: 32 }}
                    type={"secondary"}
                    onClick={() => handleModal("login", true)}
                >
                    <ResText16Regular>Login</ResText16Regular>
                </MyButton>
                <div
                    onClick={() => handleModal("signup", true)}
                    style={{ cursor: "pointer" }}
                >
                    <ResText16Regular className={"text-underlined"}>
                        New user? Sign up now
                    </ResText16Regular>
                </div>
            </LandingCard>
            {["login", "signup"].map(item => (
                <Modal
                    key={"key-authenticate-" + item}
                    title={
                        <ResText16SemiBold>
                            {capitalize(item)}
                        </ResText16SemiBold>
                    }
                    open={modals[item]}
                    footer={false}
                    onCancel={() => handleModal(item, false)}
                >
                    <Form
                        name="basic"
                        layout={"vertical"}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 600 }}
                        className={"large-vertical-margin"}
                        onFinish={values => handleSubmit(item, values)}
                        autoComplete="off"
                    >
                        {item === "signup" && (
                            <Form.Item
                                label={
                                    <ResText14Regular className={"text-grey2"}>
                                        Name
                                    </ResText14Regular>
                                }
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter your name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        )}
                        <Form.Item
                            label={
                                <ResText14Regular className={"text-grey2"}>
                                    Email
                                </ResText14Regular>
                            }
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter your email!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={
                                <ResText14Regular className={"text-grey2"}>
                                    Password
                                </ResText14Regular>
                            }
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <div className={"h-end-flex full-width"}>
                                <MyButton type="primary" htmlType="submit">
                                    {capitalize(item)}
                                </MyButton>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            ))}
        </Wrapper>
    );
}