import {UserMiniDetailsType} from "../user/types";

/******************* actions ************************/
export const FETCH_AUTH = "FETCH_AUTH";
export const SET_AUTH = "SET_AUTH";

/******************* states ************************/

export type AuthState = {
    authenticated: boolean;
    loggedUser?: UserMiniDetailsType;
};
