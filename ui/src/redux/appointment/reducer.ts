import {AppointmentState, SET_APPOINTMENT, SET_APPOINTMENTS} from "./types";
import {AppointmentFetchType} from "../../enum/AppointmentEnum";

const initialState: AppointmentState = {
    allAppointments: [],
    upcomingAppointments: []
};

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