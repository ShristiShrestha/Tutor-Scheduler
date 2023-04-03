import React, { useState } from "react";
import { Divider, Input, Modal } from "antd";
import { ResText10Regular, ResText12Regular } from "../../utils/TextUtils";
import styled from "styled-components";
import { expertises } from "../../static_data/tutors";

const Layout = styled.div``;

const footer = (
    <ResText12Regular className="select-item ant-switch-checked  text-white small-padding ant-pagination-item">
        Save Changes
    </ResText12Regular>
);

const Specialization = () => {
    return (
        <div>
            {expertises?.map(expertise => (
                <p>{expertise}</p>
            ))}
        </div>
    );
};

const ModalBlock = ({ visible, onClose, title, bodyText, param }) => {
    const [info, setInfo] = useState({
        name: "John Doe Hill `Johnny`",
        description:
            "Former teacher at School of Science. Now doing a freelance tutoring.",
    });

    const handleChange = event => {
        setInfo({
            ...info,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Layout>
            <Modal
                title={title}
                centered
                visible={visible}
                onCancel={onClose}
                footer={footer}
                mask={true}
            >
                <Divider type={"horizontal"} style={{ margin: "8px" }} />

                <p>Profile {param}</p>

                {param == "Specialization" ? <Specialization /> : null}

                {param == "Name" ? (
                    <Input
                        value={info.name}
                        className="input-textarea"
                        name="name"
                        onChange={handleChange}
                    />
                ) : null}
                {param == "Description" ? (
                    <Input.TextArea
                        className="comment-textarea"
                        name="description"
                        value={info.description}
                        autoSize={{ minRows: 6, maxRows: 10 }}
                        onChange={handleChange}
                    />
                ) : null}
                <div className={"medium-vertical-margin"}>
                    <ResText10Regular className={"text-gray"}>
                        This is public information. Make sure you use proper
                        name in your profile.
                    </ResText10Regular>
                </div>
            </Modal>
        </Layout>
    );
};

export default ModalBlock;
