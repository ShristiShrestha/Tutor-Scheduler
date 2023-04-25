import React, {useMemo} from "react";
import styled from "styled-components";
import {grey6, orange} from "../../utils/ShadesUtils";
import {
    ResText10Regular,
    ResText12Regular,
    ResText12SemiBold,
    ResText14Regular,
    ResText14SemiBold,
} from "../../utils/TextUtils";
import {Table, Tag} from "antd";
import EmptyContent from "../../components/NoContent/EmptyContent";
import {useDispatch, useSelector} from "react-redux";
import {selectAppointment} from "../../redux/appointment/reducer";
import {getScheduledSlot} from "../../utils/ScheduleUtils";
import {toHourMinStr, toMonthDateStr, toMonthDateYearStr} from "../../utils/DateUtils";
import RespondAction from "../Schedule/RespondAction";
import {useNavigate} from "react-router-dom";
import {updateAppointmentsReceived} from "../../redux/appointment/actions";
import {AlertType, openNotification} from "../../utils/Alert";
import {AppointmentType} from "../../redux/appointment/types";
import moment from "moment";
import {InfoCircleOutlined} from "@ant-design/icons";

const Wrapper = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 48px; // height of main top header - app name
  left: 210px;
  right: 0;
  padding: 0 24px;
  border-bottom: 1px solid ${grey6};

  .ant-row {
    width: 100%;
  }

  .ant-col {
    align-self: center;
  }
`;

const Content = styled.div`
  position: relative;
  top: 56px;
  height: calc(100vh - 112px);
  overflow-y: auto;
  margin-top: 16px;
`;

const TableContent = styled.div`
  padding: 20px 24px;

  .button-text {
    padding: 1px;
    color: white;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    width: 8vw;
  }

  .button-green {
    background-color: #1bb885;
  }

  .button-red {
    background-color: #f44336;
  }

  .text-field {
    margin-left: 12px;
  }

  .expertise-tags {
    width: fit-content;
    display: inline-flex;
  }

  .expertise-tag {
    border-radius: 8px;
    background: white;
    border-color: grey;
  }
`;

const columns = [
    {
        title: (
            <ResText12SemiBold className={"text-grey2"}>
                Student
            </ResText12SemiBold>
        ),
        dataIndex: "name",
        key: "name",
    },
    {
        title: (
            <ResText12SemiBold className={"text-grey2"}>
                Needs tutoring in
            </ResText12SemiBold>
        ),
        dataIndex: "needsTutoringIn",
        key: "needsTutoringIn",
    },
    {
        title: (
            <ResText12SemiBold className={"text-grey2"}>
                Scheduled for
            </ResText12SemiBold>
        ),
        dataIndex: "scheduledFor",
        key: "scheduledFor",
    },
    {
        title: (
            <ResText12SemiBold className={"text-grey2"}>
                Scheduled slot
            </ResText12SemiBold>
        ),
        dataIndex: "scheduledSlot",
        key: "scheduledSlot",
    },
    {
        title: (
            <ResText12SemiBold className={"text-grey2"}>
                Created at
            </ResText12SemiBold>
        ),
        dataIndex: "createdAt",
        key: "createdAt",
    },
    {
        title: (
            <ResText12SemiBold className={"text-grey2"}>
                Actions
            </ResText12SemiBold>
        ),
        dataIndex: "action",
        key: "action",
    },
];

const NotificationsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {notifications} = useSelector(selectAppointment);
    const notIds = notifications.map(item => item.id);

    /******************* handle events ************************/

    const duplicateSlotsRequests = useMemo(() => {
        let uniqueReqByScheduledAt = {};
        for (let i = 0; i < notifications.length; i++) {
            let notification = notifications[i];
            let scheduledFor = new Date(notification.scheduledAt);
            const _key = `${toMonthDateYearStr(scheduledFor) + "-" + toHourMinStr(scheduledFor)}`
            if (!Object.keys(uniqueReqByScheduledAt).includes(_key)) {
                uniqueReqByScheduledAt[_key] = [notification];
            } else {
                uniqueReqByScheduledAt[_key].push(notification);
            }
        }
        const moreThanOneDuplicate = Object.values(uniqueReqByScheduledAt).filter(item => item.length > 1)
        if (moreThanOneDuplicate.length > 0) return moreThanOneDuplicate[0]
        return []
    }, [notifications]);
    const handleSelectRow = record => {
        const scheduleId = record["key"].split("_")[0];

        const onSuccess = (apts: AppointmentType[]) => {
            if (apts.length > 0) {
                const aptId = apts[0].id;
                return navigate(`/schedules/${aptId}`);
            }
        };

        const onError = err =>
            openNotification(
                "Failed to mark the appointment as read.",
                err,
                AlertType.ERROR,
            );

        return {
            onClick: () => {
                if (record["visited"] !== true) {
                    dispatch(
                        updateAppointmentsReceived(
                            [parseInt(scheduleId)],
                            onSuccess,
                            onError,
                        ),
                    );
                } else {
                    navigate(`/schedules/${scheduleId}`);
                }
            },
        };
    };

    /******************* render children ************************/

    const dataSource = useMemo(
        () =>
            notifications.map((item, index) => {
                // const item = notifications.filter(
                //     item => item.id === notId,
                // )[0];
                const scheduleFor = new Date(item.scheduledAt);
                const needsTutoringIn = item.tutoringOnList;
                const scheduledSlot = getScheduledSlot(scheduleFor);
                const itemKey = item.id + "_" + index;
                return {
                    key: itemKey,
                    visited:
                        !!item.clientReceivedAt &&
                        moment(new Date()).isAfter(
                            new Date(item.clientReceivedAt),
                        ),
                    name: (
                        <ResText12Regular className={"h-start-flex"}>
                            {!item.clientReceivedAt ? (
                                <div
                                    className={"new-unseen small-margin-right"}
                                />
                            ) : (
                                ""
                            )}
                            {item.student.name}
                        </ResText12Regular>
                    ),
                    needsTutoringIn: (
                        <div className={"h-start-flex expertise-tags"}>
                            {needsTutoringIn &&
                                needsTutoringIn
                                    .slice(0, 2)
                                    .map((expertise, index) => (
                                        <Tag
                                            className={"expertise-tag"}
                                            key={index}
                                        >
                                            <ResText10Regular>
                                                {expertise}
                                            </ResText10Regular>
                                        </Tag>
                                    ))}
                            {needsTutoringIn && needsTutoringIn.length > 2 && (
                                <ResText10Regular className={"text-grey3"}>
                                    {" "}
                                    +{needsTutoringIn.length - 2} more
                                </ResText10Regular>
                            )}
                        </div>
                    ),
                    scheduledFor: (
                        <ResText12Regular>
                            {toMonthDateStr(scheduleFor)}
                        </ResText12Regular>
                    ),
                    scheduledSlot: (
                        <ResText12Regular>
                            {scheduledSlot.length > 0
                                ? scheduledSlot[0].title
                                : "N/A"}
                        </ResText12Regular>
                    ),
                    createdAt: (
                        <ResText12Regular>
                            {toMonthDateStr(new Date(item.createdAt))}
                        </ResText12Regular>
                    ),
                    action: (
                        <RespondAction
                            showRespondTitle={false}
                            propAppointment={item}
                        />
                    ),
                };
            }),
        [notIds],
    );

    const tableContent =
        dataSource.length > 0 ? (
            <Table
                key={"notifications-table"}
                dataSource={dataSource}
                columns={columns}
                onRow={(record, rowIndex) => handleSelectRow(record)}
            />
        ) : (
            <EmptyContent
                showEmptyIcon={true}
                className={"medium-vertical-margin"}
                desc={"There are no notifications."}
                title={undefined}
                action={undefined}
            />
        );

    return (
        <Wrapper>
            <Header>
                <ResText14SemiBold>Notifications</ResText14SemiBold>
            </Header>
            <Content>
                <ResText14Regular style={{marginLeft: "25px"}}>
                    Pending requests{" "}
                    {dataSource.length > 0 ? `(${dataSource.length})` : ""}
                </ResText14Regular>
                {duplicateSlotsRequests.length > 0 && (
                    <ResText12Regular className={"text-grey2 full-block display-linebreak medium-vertical-margin"}
                                      style={{marginLeft: 25}}>
                        <InfoCircleOutlined style={{marginRight: 8, fontSize: 14, color: orange}}/>
                        You have <b className={"text-grey1"}>({duplicateSlotsRequests.length})</b>
                        appointment/schedules requested for the same date and time slot.{"\n"} Accepting any
                        one of them will render other requests as rejected.
                    </ResText12Regular>
                )}
                <TableContent key={"notification-table-wrapper"}>
                    {tableContent}
                </TableContent>
            </Content>
        </Wrapper>
    );
};

export default React.memo(NotificationsPage);
