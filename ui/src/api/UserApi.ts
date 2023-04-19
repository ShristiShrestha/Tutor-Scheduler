import Api from "../utils/ApiUtils";
import {
    UserAppointmentParams,
    UserDetailsType,
    UserParams,
} from "../redux/user/types";
import { AppointmentType } from "../redux/appointment/types"; // todo: add query props

export const putUser = (user: UserDetailsType) => {
    return Api.apiCall<UserDetailsType>({
        url: "/user",
        method: "PUT",
        data: user,
    });
};

export const deleteUser = id => {
    return Api.apiCall<string>({
        url: `/user/${id}`,
        method: "DELETE",
    });
};

// todo: add query props
export const getUsers = (params: UserParams) => {
    return Api.apiCall<UserDetailsType[]>({
        url: "/user",
        method: "GET",
        params: params,
    });
};

export const getUser = id => {
    return Api.apiCall<UserDetailsType>({
        url: `/user/${id}`,
        method: "GET",
    });
};

// the user (id) is the tutor,
// logged user is basically asking for
// scheduled appointment with this tutor (user)
export const getAptsWithUser = (id: number, params: UserAppointmentParams) => {
    return Api.apiCall<AppointmentType[]>({
        url: `/user/${id}/appointment`,
        method: "GET",
        params: params,
    });
};