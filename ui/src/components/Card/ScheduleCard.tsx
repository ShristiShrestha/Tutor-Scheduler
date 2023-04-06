import React from "react";
import {Avatar, Divider, Tag} from "antd";
import styled from "styled-components";
import {ResText12Regular, ResText14SemiBold} from "../../utils/TextUtils";
import {amethyst, grey1, grey2, grey3, grey6,} from "../../utils/ShadesUtils";
import {AppointmentType} from "../../redux/appointment/types";
import {toMonthDateStr} from "../../utils/DateUtils";
import {AppointmentStatus} from "../../enum/AppointmentEnum";
import {StarOutlined, UserOutlined} from "@ant-design/icons";
import {toEndDottedStr} from "../../utils/StringUtils";

// styled components
export const Card = styled.div`
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid ${grey6};

  text {
    color: ${grey1};
  }

  :hover {
    border: 2px solid ${amethyst};
    scale: 1.05;
  }
`;

const StatusInfo = styled.div`
  .data-slot-info {
    column-gap: 8px;
  }
`;

export const TutorInfo = styled.div`
  display: flex;
  margin-top: 16px;
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

const getStatusBox = (status: AppointmentStatus) => {
    let color, text;
    switch (status) {
        case AppointmentStatus.REJECTED:
            color = "red";
            text = "Denied";
            break;
        case AppointmentStatus.PENDING:
            color = "blue";
            text = "Pending";
            break;
        case AppointmentStatus.ACCEPTED:
            color = "green";
            text = "Approved";
            break;
        default:
            color = "gray";
            text = "Unknown";
    }

    return <Tag color={color}>{text} </Tag>;
};

const ScheduleCard = (apt: AppointmentType) => {
    if (!apt) return <div> no apt </div>
    const slot = 2;
    return (
        <Card>
            <StatusInfo className={"h-justified-flex"}>
                <div className={"h-start-flex data-slot-info"}>
                    {apt.createdAt && <ResText12Regular>{toMonthDateStr(apt.createdAt)}</ResText12Regular>}
                    {slot && <Divider type={"vertical"}/>}
                    {slot && <ResText12Regular> {slot} slots</ResText12Regular>}
                </div>
                {apt.status && (
                    <span>
                        {" "}
                        {getStatusBox(apt.status)}
                    </span>
                )}
            </StatusInfo>
            <TutorInfo>
                <Avatar shape="circle" size={64}/>
                <div className={"tutor-profile-info"}>
                    <ResText14SemiBold>{apt.tutor}</ResText14SemiBold>
                    <ResText12Regular className={"text-grey4"}>
                        <StarOutlined/> <b className={"text-grey3"}>{`${apt.rating}`}</b>
                        <Divider type={"vertical"} style={{marginLeft: 12, marginRight: 12}}/>
                        <UserOutlined/> <b className={"text-grey3"}>100</b>
                    </ResText12Regular>
                </div>
            </TutorInfo>
            <Desc>
                <ResText12Regular className={"text-grey4"}>
                    "{toEndDottedStr(apt.studentNote, 36)}"
                </ResText12Regular>
            </Desc>
            <StatusTagList>
                {apt.tutoringOnList &&
                    apt.tutoringOnList.split(",").map(expertise => <Tag>{expertise}</Tag>)}
            </StatusTagList>
        </Card>
    );
};

export default ScheduleCard;
