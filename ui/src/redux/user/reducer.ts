import { SET_USER, SET_USERS, UserState } from "./types";
import { defaultPageConfig } from "../common/types";

const initialState: UserState = {
    users: [],
    usersPageConfig: defaultPageConfig,
};

/******************* reducer ************************/
export default function reducer(state = initialState, action: any): UserState {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.payload.content,
                usersPageConfig: action.payload.config,
            };
        }
        default:
            return { ...state };
    }
}