import {PageConfigType} from "../common/types";
import {UserRoles} from "../../enum/UserEnum";
import {AppointmentType} from "../appointment/types";

/******************* actions ************************/
export const FETCH_USER = "FETCH_USER";
export const SET_USER = "SET_USER";
export const FETCH_USERS = "FETCH_USERS";
export const SET_USERS = "SET_USERS";

export const FETCH_APTS_WITH_USER = "FETCH_APTS_WITH_USER";
export const SET_APTS_WITH_USER = "SET_APTS_WITH_USER";

export const UPDATE_USER = "UPDATE_USER";

/******************* props ************************/

export type UserParams = {
    sortBy?: string;
    filterKey?: string;
    filterValue?: string;
    role?: UserRoles
}

export type UserAppointmentParams = {
    status?: string;
    upcoming?: string;
    sortBy?: string;
}

export type UserMiniDetailsType = {
    email: string;
    username: string;
    roles: UserRoles[];
};

// user entity saved in db
export type UserEntityType = {
    name?: string;
    expertise?: string[];
}

// user dto that server responds with
export type UserDetailsType = {
    id: number;
    name: string;
    email: string;
    isTutor: boolean;
    roles: UserRoles[];
    rating: number;
    expertise: string[];
    createdAt: Date;
    ratedBy: number;
}

/******************* states ************************/

export type UserState = {
    // store user details of currently viewing user:
    // could be profile page of
    // a particular user
    user?: UserDetailsType;

    aptsWithUser: AppointmentType[], // scheduled apts with the profile tutor currently visitng

    // stores list of users: could be list of tutors
    users: UserDetailsType[];
    usersPageConfig: PageConfigType;
};