import React from "react";
import {Avatar, Divider, Tag} from "antd";
import styled from "styled-components";
import {ResText12Regular, ResText14SemiBold} from "../../utils/TextUtils";
import {amethyst, grey1, grey3, grey4, grey6} from "../../utils/ShadesUtils";

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
    flex-direction: row;
    row-gap: 2px;
    flex-wrap: wrap;
  }
`;

export const Desc = styled.div`
  margin-top: 1em;
  color: ${grey3};
`;

export const StatusTagList = styled.div`
  margin-top: 1em;
  row-gap: 8px;

  .ant-tag {
    background: white;
    border: 1px solid ${grey4};
    border-radius: 12px !important;
    padding: ${props => props.padding || "2px 8px"}
  }
`;

const StatusBox = ({status}) => {
    let color, text;
    switch (status) {
        case "Denied":
            color = "red";
            text = "Denied";
            break;
        case "Pending":
            color = "blue";
            text = "Pending";
            break;
        case "Approved":
            color = "green";
            text = "Approved";
            break;
        default:
            color = "gray";
            text = "Unknown";
    }

    return (<Tag color={color}>{text} </Tag>);
};

const ScheduleCard = ({
                          name, title, description, expertises, date, slot, status,
                      }) => {
    return (<Card>
        <StatusInfo className={"h-justified-flex"}>
            <div className={"h-start-flex data-slot-info"}>
                {date && <ResText12Regular>{date}</ResText12Regular>}
                {slot && <Divider type={"vertical"}/>}
                {slot && <ResText12Regular> {slot} slots</ResText12Regular>}
            </div>
            {status && <span> <StatusBox status={status}/></span>}
        </StatusInfo>
        <TutorInfo>
            <Avatar
                shape="circle"
                size={64}/>
            <div className={"tutor-profile-info"}>
                <ResText14SemiBold>{name}</ResText14SemiBold>
                <ResText12Regular>{title}</ResText12Regular>
            </div>
        </TutorInfo>
        <Desc>
            <ResText12Regular>{description}</ResText12Regular>
        </Desc>
        <StatusTagList padding={"12px 16px"}>
            {expertises && expertises.map((expertise) => (<Tag>{expertise}</Tag>))}
        </StatusTagList>
    </Card>);
};

export default ScheduleCard;
