import {
    AppointmentParams,
    AppointmentType,
    CREATE_APPOINTMENT,
    FETCH_APPOINTMENT,
    FETCH_APPOINTMENTS,
    RATE_APPOINTMENT,
    SET_APPOINTMENT,
    SET_APPOINTMENTS,
    UPDATE_APPOINTMENT,
    UPDATE_APPOINTMENTS_RECEIVED
} from "./types";
import {MyThunkDispatch} from "../common/types";
import {actionFailure, actionStart, actionSuccess} from "../common/actions";
import {AppointmentFetchType} from "../../enum/AppointmentEnum";
import {getApts, getOneApt, postApt, putApt, putAptsReceived, putRateApt} from "../../api/AppointmentApi";

/******************* state ************************/
export function setAppointment(apt: AppointmentType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_APPOINTMENT));
        dispatch({type: SET_APPOINTMENT, payload: apt});
        dispatch(actionSuccess(SET_APPOINTMENT, apt));
    };
}

export function setAppointments(apts: AppointmentType[], type: AppointmentFetchType) {
    const payload = {"apts": apts, "type": type}
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_APPOINTMENTS));
        dispatch({type: SET_APPOINTMENTS, payload: payload});
        dispatch(actionSuccess(SET_APPOINTMENTS, payload));
    };
}

/******************* api calls ************************/

export function createAppointment(apt: AppointmentType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(CREATE_APPOINTMENT));
        postApt(apt)
            .then(apt => {
                dispatch(actionSuccess(CREATE_APPOINTMENT, apt));
                dispatch(setAppointment(apt));
            })
            .catch(err => {
                dispatch(actionFailure(CREATE_APPOINTMENT, err));
            });
    };
}

export function updateAppointment(apt: AppointmentType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(UPDATE_APPOINTMENT));
        putApt(apt)
            .then(apt => {
                dispatch(actionSuccess(UPDATE_APPOINTMENT, apt));
                dispatch(setAppointment(apt));
            })
            .catch(err => {
                dispatch(actionFailure(UPDATE_APPOINTMENT, err));
            });
    };
}

export function rateAppointment(id: number, rating: number) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(RATE_APPOINTMENT));
        putRateApt(id, rating)
            .then(apt => {
                dispatch(actionSuccess(RATE_APPOINTMENT, apt));
                dispatch(setAppointment(apt));
            })
            .catch(err => {
                dispatch(actionFailure(RATE_APPOINTMENT, err));
            });
    };
}

export function updateAppointmentsReceived(ids: number[]) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(UPDATE_APPOINTMENTS_RECEIVED));
        putAptsReceived(ids)
            .then(apts => {
                dispatch(actionSuccess(UPDATE_APPOINTMENTS_RECEIVED, apts));
                // dispatch(setAppointments(apt)); todo: merge with the existing list of appointments
            })
            .catch(err => {
                dispatch(actionFailure(UPDATE_APPOINTMENTS_RECEIVED, err));
            });
    };
}

export function fetchAppointments(params: AppointmentParams) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_APPOINTMENTS));
        getApts(params)
            .then(apts => {
                const fetchType = params.upcoming ? AppointmentFetchType.UPCOMING : AppointmentFetchType.ALL
                dispatch(actionSuccess(FETCH_APPOINTMENTS, apts));
                dispatch(setAppointments(apts, fetchType));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_APPOINTMENTS, err));
            });
    };
}

export function fetchAppointment(id: number) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_APPOINTMENT));
        getOneApt(id)
            .then(apt => {
                dispatch(actionSuccess(FETCH_APPOINTMENT, apt));
                dispatch(setAppointment(apt));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_APPOINTMENT, err));
            });
    };
}