import React, { useState } from "react";
import { Avatar, Tag } from "antd";
import { ResText14SemiBold, ResText12Regular } from "../../utils/TextUtils";
import styled from "styled-components";
import { pearl } from "../../utils/ShadesUtils";
import { EditOutlined } from "@ant-design/icons";
import ModalBlock from "../../components/Modal/Modal";
import { StatusTagList } from "../Card/ScheduleCard";

const expertises = ["Computer Vision", "Machine Learning", "Web Development"];

const Layout = styled.div`
    .layout {
        height: 100%;
    }
    .margin-left {
        margin-left: 15px;
    }
`;

const ProfileCard = styled.div`
    background: ${pearl};
    align-items: center;
    margin-left: 30px;
    margin-top: 20px;
    width: 70vw;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: auto;
    .profile-info {
        padding: 30px;
        margin-bottom: 20px;
    }
    .profile-top {
        margin-top: -60px;
    }
    .arrange-div {
        display: flex;
        align-items: center;
    }
    .profile-section {
        margin: 25px 0 0 15px;
    }
`;

const NewBlock = styled.div``;

const CoverImage = () => {
    return (
        <div className="cover-image">
            <img
                style={{ width: "70vw", height: "26vh" }}
                src="https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Example Image"
            />
        </div>
    );
};

const TeacherProfileInfo = () => {
    const [visible, setVisible] = useState(false);
    const [param, setParam] = useState("title");

    const showModal = type => {
        setParam(type);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Layout className="layout">
            <ModalBlock
                visible={visible}
                onClose={handleCancel}
                title={
                    <ResText14SemiBold className="margin-left">
                        Change {param}
                    </ResText14SemiBold>
                }
                bodyText="Profile name"
                param={param}
            />

            <ProfileCard>
                <CoverImage />
                <div className="profile-info profile-top arrange-div">
                    <NewBlock>
                        <Avatar
                            size={100}
                            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                        />
                    </NewBlock>
                    <NewBlock className="profile-section">
                        <ResText14SemiBold className="margin-left">
                            John Doe Hill “Johnny"
                        </ResText14SemiBold>
                        <EditOutlined
                            className="select-item"
                            onClick={() => showModal("Name")}
                        />
                        <NewBlock>
                            <ResText12Regular className="medium-vertical-margin">
                                Former teacher at School of Science. Now doing a
                                freelance tutoring.{" "}
                                <EditOutlined
                                    className="select-item"
                                    onClick={() => showModal("Description")}
                                />
                            </ResText12Regular>
                        </NewBlock>
                    </NewBlock>
                </div>
            </ProfileCard>

            <ProfileCard>
                <div className="profile-info">
                    <ResText14SemiBold>Specializations</ResText14SemiBold>
                    <EditOutlined onClick={() => showModal("Specialization")} />
                    <NewBlock className="medium-vertical-margin">
                        <StatusTagList>
                            {expertises &&
                                expertises.map(expertise => (
                                    <Tag>
                                        <ResText12Regular>
                                            {expertise}
                                        </ResText12Regular>
                                    </Tag>
                                ))}
                        </StatusTagList>
                    </NewBlock>
                </div>
            </ProfileCard>
        </Layout>
    );
};

export default TeacherProfileInfo;
