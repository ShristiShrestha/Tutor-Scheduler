import {
    ResText12Regular,
    ResText12SemiBold,
    ResText14Regular,
} from "../../utils/TextUtils";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { amethyst, cloud, grey2, sky } from "../../utils/ShadesUtils";
import { Form, Input, Modal, Select } from "antd";
import { EditProfileEnum } from "../../enum/EditProfileEnum";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/reducer";
import MyButton from "../../components/Button/MyButton";
import { AlertType, openNotification } from "../../utils/Alert";
import { updateUser } from "../../redux/user/actions";
import { UserDetailsType } from "../../redux/user/types";

const Wrapper = styled.span`
    color: ${amethyst};
    padding: 4px 8px;

    :hover {
        color: ${grey2};
        background: ${sky};
        border: 1px solid ${cloud};
        border-radius: 4px;
        cursor: pointer;
    }
`;

const EditForm = styled.div`
    padding: 12px 20px;
`;

type Props = {
    type: EditProfileEnum;
    className?: string;
};

export default function EditProfile(props: Props) {
    const { type } = props;
    const dispatch = useDispatch();
    const [showRespondModal, setShowRespondModal] = useState(false);

    const { user } = useSelector(selectUser);

    const handleClick = () => {
        setShowRespondModal(true);
    };

    const handleSubmit = formInput => {
        if (!user)
            return openNotification(
                "Invalid tutor info",
                "",
                AlertType.WARNING,
            );

        const value = formInput[type.toLowerCase()];
        let request: UserDetailsType = { ...user };
        let successMsg = "";

        switch (type) {
            case EditProfileEnum.NAME: {
                request["name"] = value;
                successMsg = "Tutor's name updated to " + value;
                break;
            }
            case EditProfileEnum.SPECIALIZATIONS: {
                request.expertise = value;
                successMsg = "Tutor's specializations updated to " + value;
                break;
            }
            default:
                return openNotification(
                    "No edit input found",
                    "",
                    AlertType.WARNING,
                );
        }

        const onSuccess = user => {
            return openNotification(
                "Profile update",
                successMsg,
                AlertType.SUCCESS,
            );
        };

        const onError = err =>
            openNotification("Profile update", err, AlertType.ERROR);

        console.log(
            "edit profile formInput: ",
            formInput,
            " request: ",
            request,
        );

        // @ts-ignore
        dispatch(updateUser(request, onSuccess, onError));
    };

    const getFormItem = () => {
        switch (type) {
            case EditProfileEnum.NAME:
                return (
                    <Form.Item
                        label={
                            <ResText14Regular className={"text-grey2"}>
                                Name
                            </ResText14Regular>
                        }
                        name="name"
                        initialValue={user?.name}
                        rules={[
                            {
                                required: true,
                                message: "Enter tutor's name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                );
            case EditProfileEnum.SPECIALIZATIONS:
                return (
                    <Form.Item
                        label={
                            <ResText14Regular className={"text-grey2"}>
                                Name
                            </ResText14Regular>
                        }
                        initialValue={user?.expertise}
                        name="specializations"
                        rules={[
                            {
                                required: true,
                                message: "Enter tutor's specializations!",
                            },
                        ]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            // onChange={(val) => handleInputChange(EditProfileEnum.SPECIALIZATIONS, val)}
                            tokenSeparators={[","]}
                        />
                    </Form.Item>
                );
            default:
                return <div>No input</div>;
        }
    };

    if (!user?.id) return <div />;

    return (
        <>
            <Wrapper onClick={() => handleClick()}>
                <ResText12Regular {...props}>
                    Edit <EditOutlined />
                </ResText12Regular>
            </Wrapper>
            <Modal
                width={"40vw"}
                open={showRespondModal}
                okButtonProps={undefined}
                cancelButtonProps={undefined}
                onCancel={() => setShowRespondModal(false)}
                footer={null}
            >
                <EditForm>
                    <ResText12SemiBold>Edit Profile</ResText12SemiBold>
                    <Form
                        name="basic"
                        layout={"vertical"}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 600 }}
                        className={"large-vertical-margin"}
                        onFinish={values => handleSubmit(values)}
                        autoComplete="off"
                    >
                        {getFormItem()}
                        <MyButton type={"primary"} htmlType={"submit"}>
                            Submit changes
                        </MyButton>
                    </Form>
                </EditForm>
            </Modal>
        </>
    );
}