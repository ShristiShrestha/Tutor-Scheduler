import { PageConfigType } from "../common/types";
import { UserRoles } from "../../enum/UserEnum";

/******************* actions ************************/
export const FETCH_USER = "FETCH_USER";
export const SET_USER = "SET_USER";
export const FETCH_USERS = "FETCH_USERS";
export const SET_USERS = "SET_USERS";

/******************* props ************************/

export type UserMiniDetailsType = {
    email: string;
    roles: UserRoles[];
};

/******************* states ************************/

export type UserState = {
    // store user details of currently viewing user:
    // could be profile page of
    // a particular user
    user?: UserMiniDetailsType;

    // stores list of users: could be list of tutors
    users: UserMiniDetailsType[];
    usersPageConfig: PageConfigType;
};