import React from "react";
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

const input = <Input value={"Shristi Shrestha"} className="input-textarea" />;

const Description = () => {
    return (
        <Input.TextArea
            className="comment-textarea"
            value="Former teacher at School of Science. Now doing a freelance tutoring. "
            autoSize={{ minRows: 6, maxRows: 10 }}
        />
    );
};

const ModalBlock = ({ visible, onClose, title, bodyText, param }) => {
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
                        value={"Shristi Shrestha"}
                        className="input-textarea"
                    />
                ) : null}
                {param == "Description" ? <Description /> : null}
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
