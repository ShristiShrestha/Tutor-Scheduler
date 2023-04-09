import {AppointmentState, AppointmentType, SET_APPOINTMENT, SET_APPOINTMENTS} from "./types";
import {AppointmentFetchType, AppointmentStatus} from "../../enum/AppointmentEnum";
import {RootState} from "../common/types";
import {sortArrByKey, SortOrder, SortValueType} from "../../utils/SortUtils";

const initialState: AppointmentState = {
    otherAppointments: [],
    upcomingAppointments: []
};

export const selectAppointment = (state: RootState) => state.appointment;

export const filterAcceptedAptsUpcoming = (upcoming: AppointmentType[]): AppointmentType[] => {
    if (upcoming.length === 0)
        return upcoming;
    const upcomginApts = upcoming.filter(item => item.status === AppointmentStatus.ACCEPTED);
    if (upcomginApts.length > 0)
        return sortArrByKey(upcomginApts, "scheduledAt", SortValueType.DATE);
    return upcomginApts;
}

export const filterOtherAptsThanUpcoming = (allApts: AppointmentType[], upcoming: AppointmentType[]): AppointmentType[] => {
    if (upcoming.length === 0)
        return sortArrByKey(allApts, "scheduledAt", SortValueType.DATE, SortOrder.DESC);
    if (allApts.length === 0)
        return [];
    const upcomingIds = upcoming.map(item => item.id);
    const otherApts = allApts.filter(item => !upcomingIds.includes(item.id));
    if (otherApts.length > 0)
        return sortArrByKey(otherApts, "scheduledAt", SortValueType.DATE, SortOrder.DESC);
    return otherApts;
}

export default function reducer(state = initialState, action: any): AppointmentState {
    switch (action.type) {
        case SET_APPOINTMENT: {
            return {
                ...state,
                appointment: action.payload,
            };
        }
        case SET_APPOINTMENTS: {
            const {apts, type} = action.payload
            if (type === AppointmentFetchType.UPCOMING) {
                const upcomingAcceptedApts = filterAcceptedAptsUpcoming(apts);
                return {
                    ...state,
                    upcomingAppointments: upcomingAcceptedApts
                };
            }
            const otherReqs = filterOtherAptsThanUpcoming(apts, state.upcomingAppointments);
            return {
                ...state,
                otherAppointments: otherReqs
            };
        }
        default:
            return {...state};
    }
}