import React from "react";
import {Avatar, Divider, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Card, Desc, StatusTagList, TutorInfo} from "./ScheduleCard";
import {ResText12Regular, ResText14SemiBold} from "../../utils/TextUtils";

const TutorCard = ({name, title, rating, description, expertises}) => (
    <Card>
        <TutorInfo>
            <Avatar
                size={64}
                icon={<UserOutlined/>}/>
            <div className={"tutor-profile-info"}>
                <ResText14SemiBold>{name}</ResText14SemiBold>
                <div className={"vertical-start-flex full-block"}>
                    <ResText12Regular>{title}</ResText12Regular>
                    <Divider type={"vertical"}/>
                    <ResText12Regular>{rating} ratings</ResText12Regular>
                </div>
            </div>
        </TutorInfo>
        <Desc>
            <ResText12Regular>{description}</ResText12Regular>
        </Desc>
        <StatusTagList className={"h-start-flex"}>
            {expertises && expertises.map((expertise) => (<Tag>{expertise}</Tag>))}
        </StatusTagList>
    </Card>
);

export default TutorCard;
