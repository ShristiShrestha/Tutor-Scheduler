import {UserDetailsType} from "../user/types";

/******************* actions ************************/
export const FETCH_AUTH = "FETCH_AUTH";
export const SET_AUTH = "SET_AUTH";

/******************* props ************************/

export type SignupType = {
    name: string;
    email: string;
    password: string;
    isTutor: boolean;
    tutor?: {
        expertiseList: string[];
    }
}

/******************* states ************************/

export type AuthState = {
    authenticated: boolean;
    loggedUser?: UserDetailsType;
};
