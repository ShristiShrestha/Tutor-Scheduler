import { capitalize } from "../../utils/StringUtils";
import { AppointmentStatus } from "../../enum/AppointmentEnum";
import { Divider, Dropdown, Input, Menu, Modal } from "antd";
import { ResText12Regular, ResText12SemiBold } from "../../utils/TextUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAppointment } from "../../redux/appointment/reducer";
import { isLoggedStudent } from "../../utils/AuthUtils";
import { selectAuth } from "../../redux/auth/reducer";
import { toMonthDateYearStr } from "../../utils/DateUtils";
import MyButton from "../../components/Button/MyButton";
import styled from "styled-components";
import { getScheduledSlot } from "../../utils/ScheduleUtils";
import { AlertType, openNotification } from "../../utils/Alert";
import { updateAppointment } from "../../redux/appointment/actions";
import { AppointmentType } from "../../redux/appointment/types";

const Wrapper = styled.div`
    z-index: 1111;

    .ant-space-compact-block {
        width: fit-content;
        display: flex;
    }
`;

const ResponseAppointment = styled.div`
    padding: 12px 24px;

    .respond-reject-input {
        margin: 12px 0;
    }

    .respond-submit {
        margin-top: 24px;
    }
`;

const respondMenuItems = [
    {
        label: "Accept",
        key: "respond-accept",
        value: AppointmentStatus.ACCEPTED,
    },
    {
        label: "Reject",
        key: "respond-reject",
        value: AppointmentStatus.REJECTED,
    },
];

type Props = {
    showRespondTitle: boolean;
    propAppointment?: AppointmentType;
};

export default function RespondAction(props: Props) {
    const { propAppointment, showRespondTitle } = props;
    const dispatch = useDispatch();
    const [appointment, setAppointment] = useState(propAppointment);
    const [tutorUpdateReq, setTutorUpdateReq] = useState<any>({
        note: undefined,
        status: undefined,
    });
    const [showRespondModal, setShowRespondModal] = useState(false);

    /******************* redux state ************************/

    const { loggedUser } = useSelector(selectAuth);
    const { appointment: reduxApt } = useSelector(selectAppointment);

    /******************* use effects ************************/

    useEffect(() => {
        // if no appointment is passed in the props
        // use redux appointment (if exists)
        if (!propAppointment && !!reduxApt) {
            setAppointment(reduxApt);
        }

        if (!!propAppointment) setAppointment(propAppointment);
    }, [reduxApt, propAppointment]);

    /******************* dispatches ************************/

    const dispatchUpdateAptStatus = () => {
        if (!appointment)
            return openNotification(
                "Invalid appointment",
                "Failed to load appointment.",
                AlertType.WARNING,
            );
        const req = {
            id: appointment.id,
            statusMessage: tutorUpdateReq.note,
            status: tutorUpdateReq.status,
        };
        const onSuccess = apt => {
            openNotification(
                "Request successful",
                "Appointment status updated to " + apt.status,
                AlertType.SUCCESS,
            );
            setShowRespondModal(false);
        };
        const onError = err =>
            openNotification(
                "Failed to update appointment status to " +
                    tutorUpdateReq.status,
                err,
                AlertType.ERROR,
            );
        // @ts-ignore
        dispatch(updateAppointment(req, onSuccess, onError));
    };

    /******************* internal helpers ************************/

    const handleTutorUpdateReq = (key, val) => {
        setTutorUpdateReq({ ...tutorUpdateReq, [key]: val });
        setShowRespondModal(true);
    };

    const handleClick = e => {
        e.stopPropagation();
    };

    /******************* local renders ************************/

    const isStudent =
        isLoggedStudent(loggedUser) &&
        appointment &&
        appointment.studentId === loggedUser?.id;

    const respondMenu = (
        <Menu onClick={e => handleTutorUpdateReq("status", e.key)}>
            {respondMenuItems.map(item => (
                <Menu.Item key={item.value}>{item.label}</Menu.Item>
            ))}
        </Menu>
    );

    const selectedRespondStr = capitalize(
        tutorUpdateReq.status || respondMenuItems[0].value,
    )
        .toString()
        .replace("ed", "");

    const scheduledFor = appointment
        ? new Date(appointment.scheduledAt)
        : undefined;

    if (
        appointment &&
        appointment.status === AppointmentStatus.PENDING &&
        !isStudent
    )
        return (
            <Wrapper className={"h-start-flex"} onClick={e => handleClick(e)}>
                {showRespondTitle && (
                    <div className={"default-margin-right"}>
                        <Divider type={"vertical"} />
                        <ResText12SemiBold className={"text-grey2"}>
                            Respond{" "}
                        </ResText12SemiBold>
                    </div>
                )}
                <Dropdown.Button
                    style={{
                        marginRight: 12,
                    }}
                    trigger={["click"]}
                    overlay={respondMenu}
                >
                    <ResText12Regular
                        onClick={() =>
                            handleTutorUpdateReq(
                                "status",
                                tutorUpdateReq.status ||
                                    respondMenuItems[0].value,
                            )
                        }
                    >
                        {selectedRespondStr}
                    </ResText12Regular>
                </Dropdown.Button>

                {!isStudent && appointment && (
                    <Modal
                        width={"40vw"}
                        open={showRespondModal}
                        okButtonProps={undefined}
                        cancelButtonProps={undefined}
                        onCancel={() => setShowRespondModal(false)}
                        footer={null}
                    >
                        <ResponseAppointment>
                            {appointment.scheduledAt && (
                                <ResText12Regular className={"text-break"}>
                                    You are about to respond{" "}
                                    <b>{tutorUpdateReq.status}</b> to the
                                    appointment scheduled for{" "}
                                    <b>{`${toMonthDateYearStr(scheduledFor)} ${
                                        getScheduledSlot(scheduledFor)[0]?.title
                                    }`}</b>
                                    .
                                </ResText12Regular>
                            )}
                            {tutorUpdateReq.status ===
                                AppointmentStatus.REJECTED && (
                                <div className={"respond-reject-input"}>
                                    <ResText12Regular className={"text-grey2"}>
                                        Add a rejection message *
                                    </ResText12Regular>
                                    <Input.TextArea
                                        className="comment-textarea"
                                        autoSize={{ minRows: 6, maxRows: 10 }}
                                        onChange={e => {
                                            e.stopPropagation();
                                            handleTutorUpdateReq(
                                                "note",
                                                e.currentTarget.value,
                                            );
                                        }}
                                    />
                                </div>
                            )}
                            <div className={"h-end-flex respond-submit"}>
                                <MyButton
                                    htmlType={"submit"}
                                    type={"primary"}
                                    disabled={
                                        tutorUpdateReq.status ===
                                            AppointmentStatus.REJECTED &&
                                        (!tutorUpdateReq.note ||
                                            tutorUpdateReq.note?.length === 0)
                                    }
                                    onClick={() => dispatchUpdateAptStatus()}
                                >
                                    <ResText12SemiBold>
                                        Submit changes
                                    </ResText12SemiBold>
                                </MyButton>
                            </div>
                        </ResponseAppointment>
                    </Modal>
                )}
            </Wrapper>
        );
    return <></>;
}