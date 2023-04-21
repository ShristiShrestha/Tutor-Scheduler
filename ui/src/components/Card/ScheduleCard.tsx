import React, {ReactNode} from "react";
import {Avatar, Divider, Tag} from "antd";
import styled from "styled-components";
import {ResText10Regular, ResText12Regular, ResText12SemiBold,} from "../../utils/TextUtils";
import {amethyst, grey1, grey2, grey3, grey6} from "../../utils/ShadesUtils";
import {AppointmentType} from "../../redux/appointment/types";
import {toMonthDateStr, toMonthDateYearStr, toScheduleSlotRangeStr,} from "../../utils/DateUtils";
import {AppointmentStatus} from "../../enum/AppointmentEnum";
import {StarOutlined} from "@ant-design/icons";
import {toEndDottedStr} from "../../utils/StringUtils";

// styled components
export const Card = styled.div<{
    height?: string;
    minWidth?: string;
}>`
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid ${grey6};
  height: ${props => (props.height ? props.height : "fit-content")};
  min-width: ${props => (props.minWidth ? props.minWidth : "250px")};

  text {
    color: ${grey1};
  }

  :hover {
    border: 2px solid ${amethyst};
    scale: 1.05;
  }

  @media (max-width: 1024px) {
    min-width: fit-content;
  }
`;

const StatusInfo = styled.div`
  margin-bottom: 16px;

  .data-slot-info {
    column-gap: 8px;
  }
`;

export const TutorInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .tutor-profile-info {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    flex-wrap: wrap;
  }
`;

export const Desc = styled.div`
  margin-top: 1em;
  color: ${grey3};
`;

export const StatusTagList = styled.div<{ padding?: string }>`
  margin-top: 1em;
  row-gap: 8px;

  .ant-tag {
    width: fit-content;
    background: white;
    color: ${grey2} !important;
    border: 1px solid ${grey3};
    border-radius: 12px !important;
    padding: ${props => props.padding || "2px 8px"};
  }
`;

export const getStatusBox = (
    status: AppointmentStatus,
    renderText?: ReactNode,
) => {
    let color, text;
    switch (status) {
        case AppointmentStatus.REJECTED:
            color = "red";
            text = "Rejected";
            break;
        case AppointmentStatus.PENDING:
            color = "blue";
            text = "Pending";
            break;
        case AppointmentStatus.ACCEPTED:
            color = "green";
            text = "Accepted";
            break;
        default:
            color = "gray";
            text = "Unknown";
    }
    return <Tag color={color}>{renderText || text} </Tag>;
};

export const MAX_TAG_SPECIALIZATIONS = 3
export const MAX_DESC_SIZE = 40
export const MAX_DOTTED_LEAD = 8

type Props = {
    apt: AppointmentType;
    loggedUserId?: number;
};
const ScheduleCard = (props: Props) => {
    const {apt, loggedUserId} = props;

    if (!apt) return <div> no apt </div>;
    const showingTutoringIn = apt
        ? apt.tutoringOnList && apt.tutoringOnList.length > MAX_TAG_SPECIALIZATIONS
            ? apt.tutoringOnList.slice(0, MAX_TAG_SPECIALIZATIONS)
            : apt.tutoringOnList
        : [];
    const isStudent =
        !!loggedUserId &&
        apt.studentId === loggedUserId &&
        apt.student.id === loggedUserId;
    const showingName = !isStudent
        ? apt.student.name || apt.student.email
        : apt.tutor.name || apt.tutor.email;
    return (
        <Card>
            <StatusInfo className={"h-justified-flex"}>
                <div className={"h-start-flex data-slot-info"}>
                    {!!apt.createdAt && (
                        <ResText12Regular>
                            {toMonthDateStr(new Date(apt.scheduledAt))}
                        </ResText12Regular>
                    )}
                    {apt.scheduledAt && <Divider type={"vertical"}/>}
                    {apt.scheduledAt && (
                        <ResText12Regular>
                            {" "}
                            {toScheduleSlotRangeStr(new Date(apt.scheduledAt))}
                        </ResText12Regular>
                    )}
                </div>
                {apt.status && getStatusBox(apt.status)}
            </StatusInfo>
            <TutorInfo>
                <Avatar
                    shape="circle"
                    size={64}
                    src={
                        <img
                            src={process.env.PUBLIC_URL + "/avatar_male.jpg"}
                        />
                    }
                />
                <div className={"tutor-profile-info"}>
                    <ResText12SemiBold>{showingName}</ResText12SemiBold>
                    {isStudent ? (
                        <ResText12Regular>
                            {/*<span className={"text-grey1"}>{apt.tutor.description || `Freelancer developer`}</span>*/}
                            {/*<Divider type={"vertical"} style={{marginLeft: 8, marginRight: 6}}/>*/}
                            <StarOutlined style={{marginRight: 3}}/>{" "}
                            <span>{`${apt.rating}`}</span>
                            <Divider
                                type={"vertical"}
                                style={{marginLeft: 8, marginRight: 6}}
                            />
                            <span>0 ratings</span>
                        </ResText12Regular>
                    ) : (
                        <ResText12Regular className={"text-grey3"}>
                            Joined in{" "}
                            {toMonthDateYearStr(
                                new Date(apt.student.createdAt),
                            )}
                        </ResText12Regular>
                    )}
                </div>
            </TutorInfo>
            <Desc>
                <ResText12Regular className={"text-grey2"}>
                    {apt.studentNote ? `"${toEndDottedStr(apt.studentNote, MAX_DESC_SIZE)}"` :
                        <i>- No note added.</i>}
                </ResText12Regular>
            </Desc>
            <StatusTagList className={"h-start-flex"}>
                {showingTutoringIn.map(expertise => (
                    <Tag>{toEndDottedStr(expertise, MAX_DOTTED_LEAD)}</Tag>
                ))}
                <ResText10Regular className={"text-grey2"}>
                    {apt &&
                        apt.tutoringOnList?.length > MAX_TAG_SPECIALIZATIONS &&
                        `+ ${apt.tutoringOnList.length - MAX_TAG_SPECIALIZATIONS} more`}

                </ResText10Regular>
                <ResText12Regular className={"text-grey2"}>
                    {apt && apt.tutoringOnList.length < 1 &&
                        <i>- No specific course mentioned for tutoring.</i>}
                </ResText12Regular>
            </StatusTagList>
        </Card>
    );
};

export default ScheduleCard;
