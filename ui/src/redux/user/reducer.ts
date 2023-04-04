import {SET_APTS_WITH_USER, SET_USER, SET_USERS, UserState} from "./types";
import {defaultPageConfig, RootState} from "../common/types";

const initialState: UserState = {
    users: [],
    aptsWithUser: [],
    usersPageConfig: defaultPageConfig,
};

export const selectUser = (state: RootState) => state.user;

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
                users: action.payload
                // users: action.payload.content,
                // usersPageConfig: action.payload.config,
            };
        }
        case SET_APTS_WITH_USER: {
            return {
                ...state,
                aptsWithUser: action.payload
            }
        }
        default:
            return {...state};
    }
}