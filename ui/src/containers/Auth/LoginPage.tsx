import React, {useState} from "react";
import styled from "styled-components";
import {amethyst} from "../../utils/ShadesUtils";
import {Header4, ResText14Regular, ResText16Regular, ResText16SemiBold} from "../../utils/TextUtils";
import MyButton from "../../components/Button/MyButton";
import {Form, Input, Modal, notification} from "antd";
import {capitalize} from "../../utils/StringUtils";
import {login, signup} from "../../api/AuthApi";
import {NotificationPlacement} from "antd/lib/notification/interface";
import {useDispatch} from "react-redux";
import {setAuth} from "../../redux/auth/actions";
import {UserRoles} from "../../enum/UserEnum";
import {useNavigate} from "react-router";

const Wrapper = styled.div`
  background: ${amethyst};
  width: 100vw;
  height: calc(100vh - 48px);
  overflow: hidden;
`;

const LandingCard = styled.div`
  //background: white;
  padding: 24px;
  //max-width: 500px;
  //max-height: 500px;
  margin: auto;
  border: 1px solid ${amethyst};
  border-radius: 4px;
  row-gap: 12px;

  color: white;
`;

export default function LoginPage() {
    const [modals, setModalOpen] = useState({"login": false, "signup": false})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openNotification = (title, description, placement: NotificationPlacement = "topRight") => {
        notification.info({
            message: title,
            description: description,
            placement,
        });
    };

    const handleModal = (item, action) => {
        console.log("modal authenticate: ", item, action)
        setModalOpen({...modals, [item]: action})
    }

    // successful auth: todo:
    // tutor, student => schedules page by default
    // moderator => chat
    const handleSubmit = (item, formInput) => {
        switch (item) {
            case "login":
                login(formInput).then(res => {
                    navigate("/schedules")
                    // history.go(0)
                }).catch(err => {
                    openNotification("Error on " + capitalize(item), "Error msg: " + err)
                    //     todo: remove this
                    // @ts-ignore
                    dispatch(setAuth({"email": "shristi@lsu.edu", roles: [UserRoles.STUDENT]}))
                    navigate("/schedules")
                    // history.go(0)
                })
                break;
            case "signup":
                signup(formInput).then(res => {
                    navigate("/schedules")
                    // history.go(0)
                }).catch(err => {
                    openNotification("Error on " + capitalize(item), "Error msg: " + err)
                    //     TODO: remove
                    // @ts-ignore
                    dispatch(setAuth({"email": "shristi@lsu.edu", roles: [UserRoles.STUDENT]}))
                    navigate("/schedules")
                    // history.go(0)
                })
                break;
            default:
                alert("Invalid actions.")
        }
    }

    return (
        <Wrapper>
            <LandingCard className={"centered-flex"}>
                <Header4 className={"text-white"}>
                    Online Tutor Scheduler
                </Header4>
                <ResText16Regular>
                    <u>Find</u> Tutors of your <u>choice</u>
                </ResText16Regular>

                <MyButton type={"secondary"} onClick={() => handleModal("login", true)}>
                    <ResText16Regular>Login</ResText16Regular>
                </MyButton>
                <div onClick={() => handleModal("signup", true)} style={{cursor: "pointer"}}>
                    <ResText16Regular className={"text-underlined"}>New user? Sign up now</ResText16Regular>
                </div>
            </LandingCard>
            {["login", "signup"].map(item => <Modal
                key={"key-authenticate-" + item}
                title={<ResText16SemiBold>{capitalize(item)}</ResText16SemiBold>}
                open={modals[item]}
                footer={false}
                onCancel={() => handleModal(item, false)}
            >
                <Form name="basic"
                      layout={"vertical"}
                      labelCol={{span: 24}}
                      wrapperCol={{span: 24}}
                      style={{maxWidth: 600}}
                      className={"large-vertical-margin"}
                      onFinish={(values) => handleSubmit(item, values)}
                      autoComplete="off">
                    <Form.Item
                        label={<ResText14Regular className={"text-grey2"}>Email</ResText14Regular>}
                        name="email"
                        rules={[{required: true, message: 'Enter your email!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={<ResText14Regular className={"text-grey2"}>Password</ResText14Regular>}
                        name="password"
                        rules={[{required: true, message: 'Enter your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item>
                        <div className={"h-end-flex full-width"}>
                            <MyButton type="primary" htmlType="submit">
                                {capitalize(item)}
                            </MyButton>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>)}
        </Wrapper>
    );
}