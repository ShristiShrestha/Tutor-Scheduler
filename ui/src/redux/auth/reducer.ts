import {AuthState, SET_AUTH} from "./types";
import {RootState} from "../common/types";

const initialState: AuthState = {
    authenticated: false,
};
/******************* reducer ************************/

export const selectAuth = (state: RootState) => state.auth;
export default function reducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case SET_AUTH: {
            return {
                ...state,
                authenticated: action.payload.authenticated,
                loggedUser: action.payload.loggedUser,
            };
        }
        default:
            return {...state};
    }
}