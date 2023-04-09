import { RootState } from "../common/types";
import { ChatState, SET_USER_CONV, SET_USERS_CONVS } from "./types";

const initialState: ChatState = {
    userMessages: [],
    usersMessages: {},
};

export const selectChat = (state: RootState) => state.chat;

/******************* reducer ************************/
export default function reducer(state = initialState, action: any): ChatState {
    switch (action.type) {
        case SET_USER_CONV: {
            return {
                ...state,
                userMessages: action.payload,
            };
        }
        case SET_USERS_CONVS: {
            return {
                ...state,
                usersMessages: action.payload,
            };
        }
        default:
            return { ...state };
    }
}
