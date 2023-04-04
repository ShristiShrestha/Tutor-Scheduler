import {
    FETCH_APTS_WITH_USER,
    FETCH_USER,
    FETCH_USERS,
    SET_APTS_WITH_USER,
    SET_USER,
    SET_USERS,
    UPDATE_USER,
    UserAppointmentParams,
    UserDetailsType,
    UserEntityType,
    UserParams,
} from "./types";
import {MyThunkDispatch} from "../common/types";
import {actionFailure, actionStart, actionSuccess} from "../common/actions";
import {getAptsWithUser, getUser, getUsers, putUser} from "../../api/UserApi";
import {AppointmentType} from "../appointment/types";

/******************* state ************************/
export function setUser(props: UserDetailsType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_USER));
        dispatch({type: SET_USER, payload: props});
        dispatch(actionSuccess(SET_USER, props));
    };
}

export function setUsers(props: UserDetailsType[]) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_USERS));
        dispatch({type: SET_USERS, payload: props});
        dispatch(actionSuccess(SET_USERS, props));
    };
}

export function setAptsWithUser(props: AppointmentType[]) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_APTS_WITH_USER));
        dispatch({type: SET_APTS_WITH_USER, payload: props});
        dispatch(actionSuccess(SET_APTS_WITH_USER, props));
    };
}

/******************* api calls ************************/

export function fetchUsers(params: UserParams) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_USERS));
        getUsers(params)
            .then(users => {
                dispatch(actionSuccess(FETCH_USERS, users));
                dispatch(setUsers(users));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_USERS, err));
            });
    };
}

export function fetchUser(id: number) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_USER));
        getUser(id)
            .then(user => {
                dispatch(actionSuccess(FETCH_USER, user));
                dispatch(setUser(user));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_USER, err));
            });
    };
}

export function updateUser(user: UserEntityType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(UPDATE_USER));
        putUser(user)
            .then(user => {
                dispatch(actionSuccess(UPDATE_USER, user));
                dispatch(setUser(user));
            })
            .catch(err => {
                dispatch(actionFailure(UPDATE_USER, err));
            });
    };
}

export function fetchAptWithUser(id: number, params: UserAppointmentParams) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_APTS_WITH_USER));
        getAptsWithUser(id, params)
            .then(apts => {
                dispatch(actionSuccess(FETCH_APTS_WITH_USER, apts));
                dispatch(setAptsWithUser(apts));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_APTS_WITH_USER, err));
            });
    };
}