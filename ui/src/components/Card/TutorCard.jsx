import React from "react";
import { Avatar, Divider, Tag } from "antd";
import { StarOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Desc, StatusTagList, TutorInfo } from "./ScheduleCard";
import {
    ResText10Regular,
    ResText12Regular,
    ResText12SemiBold,
} from "../../utils/TextUtils";
import { toEndDottedStr } from "../../utils/StringUtils";
import { UserDetailsType } from "../../redux/user/types";

type Props = {
    tutor: UserDetailsType,
    loggedUserId?: string,
};

const TutorCard = (props: Props) => {
    const { tutor, loggedUserId } = props;
    const showingExpertises =
        tutor && tutor.expertise && tutor.expertise.length > 2
            ? tutor.expertise.slice(0, 2)
            : tutor.expertise;
    if (!!tutor)
        return (
            <Card height={"170px"}>
                <TutorInfo>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <div className={"tutor-profile-info"}>
                        <ResText12SemiBold>
                            {tutor.name || tutor.email.split("@")[0]}
                            {loggedUserId && loggedUserId === tutor.id && (
                                <Tag
                                    style={{
                                        marginLeft: 8,
                                        alignSelf: "center",
                                    }}
                                >
                                    Me
                                </Tag>
                            )}
                        </ResText12SemiBold>
                        <div
                            className={
                                "vertical-start-flex full-block text-grey1"
                            }
                        >
                            <StarOutlined style={{ marginRight: 3 }} />
                            <ResText12Regular>{`${tutor.rating}`}</ResText12Regular>
                            <Divider
                                type={"vertical"}
                                style={{ marginLeft: 10, marginRight: 10 }}
                            />
                            <ResText12Regular>
                                {tutor.ratedBy} ratings
                            </ResText12Regular>
                        </div>
                    </div>
                </TutorInfo>
                <Desc>
                    <ResText12Regular>
                        {toEndDottedStr(tutor.description, 45)}
                    </ResText12Regular>
                </Desc>
                <StatusTagList className={"h-start-flex"}>
                    {showingExpertises.map(expertise => (
                        <Tag>
                            <ResText10Regular className={"text-grey3"}>
                                {toEndDottedStr(expertise, 12)}
                            </ResText10Regular>
                        </Tag>
                    ))}
                    <ResText10Regular className={"text-grey2"}>
                        {tutor &&
                            tutor.expertise?.length > 2 &&
                            `+ ${tutor.expertise.length - 2} more`}
                    </ResText10Regular>
                </StatusTagList>
            </Card>
        );
    return <></>;
};

export default TutorCard;
