import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ResText12Regular, ResText14SemiBold, ResText16Regular} from "../../utils/TextUtils";
import {TabContent} from "../Schedule/ScheduleView";
import React from "react";
import {selectUser} from "../../redux/user/reducer";
import {selectAuth} from "../../redux/auth/reducer";
import {getFormattedRatings} from "../../utils/ScheduleUtils";

export default function ViewTutorRatings() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // redux states
    const {loggedUser} = useSelector(selectAuth);
    const {user, aptsWithUser} = useSelector(selectUser);

    const userRatings = getFormattedRatings(loggedUser);

    return <TabContent>
        <ResText14SemiBold>
            Overall tutor ratings
        </ResText14SemiBold>
        <div className={"rate-tutor-content"}>
            <div className={"rate-tutor-features h-start-top-flex"}>
                <ResText16Regular className={"text-grey2"}>
                    Tutoring skill
                </ResText16Regular>
                <ul className={"rate-tutor-options"}>
                    {userRatings.map(item => (
                        <li className={"centered-flex margin-btm-icon " + item.className}>
                            {item.icon}
                            <ResText12Regular>{item.totalUsers}</ResText12Regular>
                        </li>
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
}