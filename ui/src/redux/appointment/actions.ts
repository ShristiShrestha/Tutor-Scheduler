import {
    ACCEPT_APPOINTMENT,
    AppointmentParams,
    AppointmentType,
    CREATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    FETCH_APPOINTMENT,
    FETCH_APPOINTMENTS,
    FETCH_NOTIFICATIONS,
    RATE_APPOINTMENT,
    REJECT_APPOINTMENT,
    SET_APPOINTMENT,
    SET_APPOINTMENTS,
    SET_NOTIFICATIONS,
    UPDATE_APPOINTMENT,
    UPDATE_APPOINTMENTS_RECEIVED,
} from "./types";
import { MyThunkDispatch } from "../common/types";
import { actionFailure, actionStart, actionSuccess } from "../common/actions";
import { AppointmentFetchType } from "../../enum/AppointmentEnum";
import {
    deleteApt,
    getApts,
    getOneApt,
    postApt,
    putApt,
    putAptsReceived,
    putRateApt,
} from "../../api/AppointmentApi";

/******************* state ************************/
export function setAppointment(apt: AppointmentType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_APPOINTMENT));
        dispatch({ type: SET_APPOINTMENT, payload: apt });
        dispatch(actionSuccess(SET_APPOINTMENT, apt));
    };
}

export function setAppointments(
    apts: AppointmentType[],
    type: AppointmentFetchType,
) {
    const payload = { apts: apts, type: type };
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_APPOINTMENTS));
        dispatch({ type: SET_APPOINTMENTS, payload: payload });
        dispatch(actionSuccess(SET_APPOINTMENTS, payload));
    };
}

export function setNotifications(apts: AppointmentType[]) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_NOTIFICATIONS));
        dispatch({ type: SET_NOTIFICATIONS, payload: apts });
        dispatch(actionSuccess(SET_NOTIFICATIONS, apts));
    };
}

/******************* api calls ************************/

export function createAppointment(
    apt: AppointmentType,
    onSuccess?: Function,
    onError?: Function,
) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(CREATE_APPOINTMENT));
        postApt(apt)
            .then(apt => {
                dispatch(actionSuccess(CREATE_APPOINTMENT, apt));
                dispatch(setAppointment(apt));
                onSuccess && onSuccess(apt);
            })
            .catch(err => {
                dispatch(actionFailure(CREATE_APPOINTMENT, err));
                onError && onError(err);
            });
    };
}

export function updateAppointment(
    apt: AppointmentType,
    onSuccess?: Function,
    onError?: Function,
) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(UPDATE_APPOINTMENT));
        putApt(apt)
            .then(apt => {
                dispatch(actionSuccess(UPDATE_APPOINTMENT, apt));
                dispatch(setAppointment(apt));
                onSuccess && onSuccess(apt);
            })
            .catch(err => {
                dispatch(actionFailure(UPDATE_APPOINTMENT, err));
                onError && onError(err);
            });
    };
}

export function rateAppointment(
    id: number,
    rating: number,
    onSuccess?: Function,
    onError?: Function,
) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(RATE_APPOINTMENT));
        putRateApt(id, rating)
            .then(apt => {
                dispatch(actionSuccess(RATE_APPOINTMENT, apt));
                dispatch(setAppointment(apt));
                onSuccess && onSuccess(apt);
            })
            .catch(err => {
                dispatch(actionFailure(RATE_APPOINTMENT, err));
                onError && onError(err);
            });
    };
}

export function updateAppointmentsReceived(
    ids: number[],
    onSuccess?: Function,
    onError?: Function,
) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(UPDATE_APPOINTMENTS_RECEIVED));
        putAptsReceived(ids)
            .then(apts => {
                dispatch(actionSuccess(UPDATE_APPOINTMENTS_RECEIVED, apts));
                // dispatch(setAppointments(apt)); todo: merge with the existing list of appointments
                onSuccess && onSuccess(apts);
            })
            .catch(err => {
                dispatch(actionFailure(UPDATE_APPOINTMENTS_RECEIVED, err));
                onError && onError(err);
            });
    };
}

export function fetchAppointments(params: AppointmentParams) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_APPOINTMENTS));
        getApts(params)
            .then(apts => {
                const fetchType = params.upcoming
                    ? AppointmentFetchType.UPCOMING
                    : AppointmentFetchType.ALL;
                dispatch(actionSuccess(FETCH_APPOINTMENTS, apts));
                dispatch(setAppointments(apts, fetchType));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_APPOINTMENTS, err));
            });
    };
}

export function fetchNotifications(params: AppointmentParams) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_NOTIFICATIONS));
        getApts(params)
            .then(apts => {
                dispatch(actionSuccess(FETCH_NOTIFICATIONS, apts));
                dispatch(setNotifications(apts));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_NOTIFICATIONS, err));
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

export function deleteAppointment(id: number) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(DELETE_APPOINTMENT));
        deleteApt(id)
            .then(apt => {
                dispatch(actionSuccess(DELETE_APPOINTMENT, apt));
                // dispatch(setExistingAppointments(apt));
            })
            .catch(err => {
                dispatch(actionFailure(DELETE_APPOINTMENT, err));
            });
    };
}

export function acceptAppointment(id: number) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(ACCEPT_APPOINTMENT));
        //     acceptApt(id)
        //         .then(apt => {
        //             dispatch(actionSuccess(ACCEPT_APPOINTMENT, apt));
        //             // dispatch(setExistingAppointments(apt));
        //         })
        //         .catch(err => {
        //             dispatch(actionFailure(ACCEPT_APPOINTMENT, err));
        //         });
    };
}

export function rejectAppointment(id: number) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(REJECT_APPOINTMENT));
        deleteApt(id)
            .then(apt => {
                dispatch(actionSuccess(REJECT_APPOINTMENT, apt));
                // dispatch(setExistingAppointments(apt));
            })
            .catch(err => {
                dispatch(actionFailure(REJECT_APPOINTMENT, err));
            });
    };
}
