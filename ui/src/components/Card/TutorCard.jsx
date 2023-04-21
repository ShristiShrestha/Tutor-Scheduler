import React from "react";
import {Avatar, Divider, Tag} from "antd";
import {StarFilled} from "@ant-design/icons";
import {
    Card,
    Desc,
    MAX_DESC_SIZE,
    MAX_DOTTED_LEAD,
    MAX_TAG_SPECIALIZATIONS,
    StatusTagList,
    TutorInfo
} from "./ScheduleCard";
import {ResText10Regular, ResText12Regular, ResText12SemiBold,} from "../../utils/TextUtils";
import {toEndDottedStr} from "../../utils/StringUtils";
import {UserDetailsType} from "../../redux/user/types";
import {orange} from "../../utils/ShadesUtils";

type Props = {
    tutor: UserDetailsType,
    loggedUserId?: string,
};

const TutorCard = (props: Props) => {
    const {tutor, loggedUserId} = props;
    const showingExpertises =
        tutor && tutor.expertise && tutor.expertise.length > MAX_TAG_SPECIALIZATIONS
            ? tutor.expertise.slice(0, MAX_TAG_SPECIALIZATIONS)
            : tutor.expertise;
    if (!!tutor)
        return (
            <Card>
                <TutorInfo>
                    <Avatar
                        size={64}
                        src={
                            <img
                                src={
                                    process.env.PUBLIC_URL + "/avatar_male.jpg"
                                }
                            />
                        }
                    />
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
                            <StarFilled style={{color: orange, marginRight: 3}}/>{" "}
                            <ResText12Regular>{`${tutor.rating}`}</ResText12Regular>
                            <Divider
                                type={"vertical"}
                                style={{marginLeft: 10, marginRight: 10}}
                            />
                            <ResText12Regular>
                                {tutor.ratedBy} {tutor.ratedBy > 1 ? "ratings" : "rating"}
                            </ResText12Regular>
                        </div>
                    </div>
                </TutorInfo>
                <Desc>
                    <ResText12Regular>
                        {toEndDottedStr(tutor.description, MAX_DESC_SIZE)}
                    </ResText12Regular>
                </Desc>
                <StatusTagList className={"h-start-flex"}>
                    {showingExpertises.map(expertise => (
                        <Tag>
                            {toEndDottedStr(expertise, MAX_DOTTED_LEAD)}
                        </Tag>
                    ))}
                    <ResText10Regular className={"text-grey2"}>
                        {tutor &&
                            tutor.expertise?.length > MAX_TAG_SPECIALIZATIONS &&
                            `+ ${tutor.expertise.length - MAX_TAG_SPECIALIZATIONS} more`}
                    </ResText10Regular>
                    <ResText12Regular className={"text-grey2"}>
                        {tutor && tutor.expertise.length < 1 &&
                            <i>- No specific specialization mentioned.</i>}
                    </ResText12Regular>
                </StatusTagList>
            </Card>
        );
    return <></>;
};

export default TutorCard;
