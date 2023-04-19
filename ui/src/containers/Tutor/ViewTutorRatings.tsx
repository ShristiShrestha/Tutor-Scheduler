import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
    ResText12Regular,
    ResText14Regular,
    ResText14SemiBold,
    Text12Regular,
} from "../../utils/TextUtils";
import { TabContent } from "../Schedule/ScheduleView";
import React from "react";
import { selectAuth } from "../../redux/auth/reducer";
import { getFormattedRatings } from "../../utils/ScheduleUtils";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { orange } from "../../utils/ShadesUtils";

export default function ViewTutorRatings() {
    const { id } = useParams();

    const { loggedUser } = useSelector(selectAuth);

    const userRatings = getFormattedRatings(loggedUser);
    const loggedUserIsTutor = loggedUser && loggedUser?.id?.toString() === id;

    return (
        <TabContent>
            <ResText14SemiBold>Overall ratings</ResText14SemiBold>
            {loggedUserIsTutor && (
                <Text12Regular
                    className={"small-vertical-margin full-block text-grey2"}
                >
                    <InfoCircleOutlined
                        style={{ color: orange, marginRight: 8, fontSize: 14 }}
                    />
                    You are not allowed to rate yourself.
                </Text12Regular>
            )}
            <div className={"rate-tutor-content"}>
                <div className={"rate-tutor-features h-start-top-flex"}>
                    <ResText14Regular className={"text-grey2"}>
                        Tutoring skill
                    </ResText14Regular>
                    <ul className={"rate-tutor-options"}>
                        {userRatings.map((item, index) => (
                            <Tooltip
                                key={"rate-icons-" + item.id + "-" + index}
                                title={item.title}
                            >
                                <li
                                    className={
                                        "centered-flex margin-btm-icon " +
                                        item.className
                                    }
                                >
                                    {item.icon}
                                    <ResText12Regular>
                                        {item.totalUsers}
                                    </ResText12Regular>
                                </li>
                            </Tooltip>
                        ))}
                    </ul>
                </div>
                {/*<div className={"rate-tutor-comment h-start-flex"}>*/}
                {/*    <ResText16Regular className={"text-grey2"}>*/}
                {/*        Your comment{" "}*/}
                {/*        <img*/}
                {/*            width={20}*/}
                {/*            height={20}*/}
                {/*            style={{*/}
                {/*                marginLeft: 4,*/}
                {/*                marginBottom: "-4px",*/}
                {/*            }}*/}
                {/*            src={*/}
                {/*                process.env.PUBLIC_URL +*/}
                {/*                "/pouting_face.svg"*/}
                {/*            }*/}
                {/*        />*/}
                {/*    </ResText16Regular>*/}
                {/*    <Input*/}
                {/*        disabled={true}*/}
                {/*        rootClassName={"rate-tutor-input"}*/}
                {/*        size={"large"}*/}
                {/*        bordered*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </TabContent>
    );
}