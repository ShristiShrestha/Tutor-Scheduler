import {FETCH_USER, FETCH_USERS, SET_USER, SET_USERS, UserDetailsType,} from "./types";
import {MyThunkDispatch, PageResponse} from "../common/types";
import {actionFailure, actionStart, actionSuccess} from "../common/actions";
import {getUser, getUsers} from "../../api/UserApi";

/******************* state ************************/
export function setUser(props: UserDetailsType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_USER));
        dispatch({type: SET_USER, payload: props});
        dispatch(actionSuccess(SET_USER, props));
    };
}

export function setUsers(props: PageResponse<UserDetailsType>) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_USERS));
        dispatch({type: SET_USERS, payload: props});
        dispatch(actionSuccess(SET_USERS, props));
    };
}

/******************* api calls ************************/

export function fetchUsers() {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_USERS));
        getUsers()
            .then(pagedUsers => {
                dispatch(actionSuccess(FETCH_USERS, pagedUsers));
                dispatch(setUsers(pagedUsers));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_USERS, err));
            });
    };
}

export function fetchUser() {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_USER));
        getUser()
            .then(user => {
                dispatch(actionSuccess(FETCH_USER, user));
                dispatch(setUser(user));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_USER, err));
            });
    };
}