import {
    AppointmentState,
    AppointmentType,
    SET_APPOINTMENT,
    SET_APPOINTMENTS,
    SET_NOTIFICATIONS,
} from "./types";
import {
    AppointmentFetchType,
    AppointmentStatus,
} from "../../enum/AppointmentEnum";
import { RootState } from "../common/types";
import { sortArrByKey, SortValueType } from "../../utils/SortUtils";

const initialState: AppointmentState = {
    otherAppointments: [],
    upcomingAppointments: [],
    notifications: [],
};

export const selectAppointment = (state: RootState) => state.appointment;

export const filterNotifications = (apts: AppointmentType[]) => {
    if (apts.length === 0) return apts;
    const nonClientReceivedPending = apts.filter(
        item => item.status === AppointmentStatus.PENDING,
        // &&
        // (item.clientReceivedAt === null ||
        //     item.clientReceivedAt === undefined),
    );
    if (nonClientReceivedPending.length > 0)
        return sortArrByKey(
            nonClientReceivedPending,
            "scheduledAt",
            SortValueType.DATE,
        );
    return nonClientReceivedPending;
};

export const filterAcceptedAptsUpcoming = (
    upcoming: AppointmentType[],
): AppointmentType[] => {
    if (upcoming.length === 0) return upcoming;
    const upcomginApts = upcoming.filter(
        item => item.status === AppointmentStatus.ACCEPTED,
    );
    if (upcomginApts.length > 0)
        return sortArrByKey(upcomginApts, "scheduledAt", SortValueType.DATE);
    return upcomginApts;
};

export const filterOtherAptsThanUpcoming = (
    allApts: AppointmentType[],
    upcoming: AppointmentType[],
): AppointmentType[] => {
    if (upcoming.length === 0)
        return sortArrByKey(allApts, "scheduledAt", SortValueType.DATE);
    if (allApts.length === 0) return [];
    const upcomingIds = upcoming.map(item => item.id);
    const otherApts = allApts.filter(item => !upcomingIds.includes(item.id));
    if (otherApts.length > 0)
        return sortArrByKey(otherApts, "scheduledAt", SortValueType.DATE);
    return otherApts;
};

export default function reducer(
    state = initialState,
    action: any,
): AppointmentState {
    switch (action.type) {
        case SET_APPOINTMENT: {
            return {
                ...state,
                appointment: action.payload,
            };
        }
        case SET_APPOINTMENTS: {
            const { apts, type } = action.payload;
            if (type === AppointmentFetchType.UPCOMING) {
                const upcomingAcceptedApts = filterAcceptedAptsUpcoming(apts);
                return {
                    ...state,
                    upcomingAppointments: upcomingAcceptedApts,
                };
            }
            const otherReqs = filterOtherAptsThanUpcoming(
                apts,
                state.upcomingAppointments,
            );
            return {
                ...state,
                otherAppointments: otherReqs,
            };
        }
        case SET_NOTIFICATIONS: {
            const notsApts = filterNotifications(action.payload);
            return {
                ...state,
                notifications: notsApts,
            };
        }

        default:
            return { ...state };
    }
}