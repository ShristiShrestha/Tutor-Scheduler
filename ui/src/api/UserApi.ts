import Api from "../utils/ApiUtils";
import {PageResponse} from "../redux/common/types";
import {UserDetailsType} from "../redux/user/types"; // todo: add query props

// todo: add query props
export const getUsers = () => {
    return Api.apiCall<PageResponse<UserDetailsType>>({
        url: "/users",
        method: "GET",
    });
};

export const getUser = () => {
    return Api.apiCall<UserDetailsType>({
        url: "/user",
        method: "GET",
    });
};