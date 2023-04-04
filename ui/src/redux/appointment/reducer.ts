import {AppointmentState, SET_APPOINTMENT, SET_APPOINTMENTS} from "./types";
import {AppointmentFetchType} from "../../enum/AppointmentEnum";
import {RootState} from "../common/types";

const initialState: AppointmentState = {
    allAppointments: [],
    upcomingAppointments: []
};

export const selectAppointment = (state: RootState) => state.appointment;

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
            if (type === AppointmentFetchType.UPCOMING)
                return {
                    ...state,
                    upcomingAppointments: apts
                };
            return {
                ...state,
                allAppointments: apts
            };
        }
        default:
            return {...state};
    }
}