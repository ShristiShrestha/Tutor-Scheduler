import {useSelector} from "react-redux";
import {ResText12Regular, ResText14Regular, ResText14SemiBold,} from "../../utils/TextUtils";
import {TabContent} from "../Schedule/ScheduleView";
import React from "react";
import {getFormattedRatings} from "../../utils/ScheduleUtils";
import {Tooltip} from "antd";
import {selectUser} from "../../redux/user/reducer";

export default function ViewTutorRatings() {
    const {user} = useSelector(selectUser);
    const userRatings = getFormattedRatings(user);

    return (
        <TabContent>
            <ResText14SemiBold>Overall ratings</ResText14SemiBold>
            <div className={"rate-tutor-content"}>
                <div className={"rate-tutor-features h-start-top-flex"}>
                    <ResText14Regular className={"text-grey1"}>
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
            </div>
        </TabContent>
    );
}