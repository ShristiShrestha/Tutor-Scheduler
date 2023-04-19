import React, { useMemo } from "react";
import styled from "styled-components";
import { grey6 } from "../../utils/ShadesUtils";
import {
    ResText10Regular,
    ResText12Regular,
    ResText12SemiBold,
    ResText14Regular,
    ResText14SemiBold,
} from "../../utils/TextUtils";
import { Table, Tag } from "antd";
import EmptyContent from "../../components/NoContent/EmptyContent";
import { useSelector } from "react-redux";
import { selectAppointment } from "../../redux/appointment/reducer";
import { getScheduledSlot } from "../../utils/ScheduleUtils";
import { toMonthDateStr } from "../../utils/DateUtils";
import RespondAction from "../Schedule/RespondAction";

const Wrapper = styled.div``;

const Header = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 48px; // height of main top header - app name
    left: 200px;
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

    .new-unseen {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: limegreen;
        border: 1px solid limegreen;
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
    const { notifications } = useSelector(selectAppointment);
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
        [notifications],
    );

    const tableContent =
        dataSource.length > 0 ? (
            <Table
                key={"notifications-table"}
                dataSource={dataSource}
                columns={columns}
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
                <ResText14Regular style={{ marginLeft: "25px" }}>
                    Pending requests{" "}
                    {dataSource.length > 0 ? `(${dataSource.length})` : ""}
                </ResText14Regular>
                <TableContent key={"notification-table-wrapper"}>
                    {tableContent}
                </TableContent>
            </Content>
        </Wrapper>
    );
};

export default React.memo(NotificationsPage);
