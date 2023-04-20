import {MyThunkDispatch} from "../common/types";
import {UserMiniDetailsType} from "../user/types";
import {SET_AUTH} from "./types";
import {actionStart, actionSuccess} from "../common/actions";

/******************* state ************************/
export function setAuth(props?: UserMiniDetailsType) {
    return (dispatch: MyThunkDispatch) => {
        const stateProps = {
            authenticated: !!props,
            loggedUser: props,
        };
        dispatch(actionStart(SET_AUTH));
        dispatch({type: SET_AUTH, payload: stateProps});
        dispatch(actionSuccess(SET_AUTH, props));
    };
}