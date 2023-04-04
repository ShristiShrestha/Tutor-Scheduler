import {MyThunkDispatch} from "../common/types";
import {actionFailure, actionStart, actionSuccess} from "../common/actions";
import {getMsgs, getMsgsWithUser, postMsg, putMsgReceived} from "../../api/ChatApi";
import {
    FETCH_USER_CONV,
    FETCH_USERS_CONV,
    MessageType,
    SEND_MESSAGE,
    SET_USER_CONV,
    SET_USERS_CONVS,
    UPDATE_MESSAGE_RECEIVED
} from "./types";

export function setMsgsWithUsers(props: Record<string, MessageType[]>) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_USERS_CONVS));
        dispatch({type: SET_USERS_CONVS, payload: props});
        dispatch(actionSuccess(SET_USERS_CONVS, props));
    };
}

export function setMsgsWithUser(props: MessageType[]) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SET_USER_CONV));
        dispatch({type: SET_USER_CONV, payload: props});
        dispatch(actionSuccess(SET_USER_CONV, props));
    };
}

/******************* api calls ************************/

export function sendMessage(msg: MessageType) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(SEND_MESSAGE));
        postMsg(msg)
            .then(res => {
                dispatch(actionSuccess(SEND_MESSAGE, res));
                // once a message is sent, fetch new list of
                // messages with the person
                // TODO: if server sends the messages with new added message
                // then remove this and instead save it to reducer
                dispatch(fetchMsgsWithUser(msg.receiverEmail));
            })
            .catch(err => {
                dispatch(actionFailure(SEND_MESSAGE, err));
            });
    };
}

export function updateMsgsReceived(ids: number[]) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(UPDATE_MESSAGE_RECEIVED));
        putMsgReceived(ids)
            .then(res => {
                dispatch(actionSuccess(UPDATE_MESSAGE_RECEIVED, res));
                // once a message is sent, fetch new list of
                // messages with the person
                // TODO: if server sends the messages with new added message
                // then remove this and instead save it to reducer
                // dispatch(fetchMsgsWithUser(msg.receiverEmail));
            })
            .catch(err => {
                dispatch(actionFailure(UPDATE_MESSAGE_RECEIVED, err));
            });
    };
}

export function fetchMsgsWithUser(email: string) {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_USER_CONV));
        getMsgsWithUser(email)
            .then(msgs => {
                dispatch(actionSuccess(FETCH_USER_CONV, msgs));
                dispatch(setMsgsWithUser(msgs));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_USER_CONV, err));
            });
    };
}

export function fetchMsgsWithUsers() {
    return (dispatch: MyThunkDispatch) => {
        dispatch(actionStart(FETCH_USERS_CONV));
        getMsgs()
            .then(msgsWithUsers => {
                dispatch(actionSuccess(FETCH_USERS_CONV, msgsWithUsers));
                dispatch(setMsgsWithUsers(msgsWithUsers));
            })
            .catch(err => {
                dispatch(actionFailure(FETCH_USERS_CONV, err));
            });
    };
}