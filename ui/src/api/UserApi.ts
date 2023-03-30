import Api from "../utils/ApiUtils";
import {PageResponse} from "../redux/common/types";
import {UserMiniDetailsType} from "../redux/user/types"; // todo: add query props

// todo: add query props
export const getUsers = () => {
    return Api.apiCall<PageResponse<UserMiniDetailsType>>({
        url: "/users",
        method: "GET",
    });
};

export const getUser = () => {
    return Api.apiCall<UserMiniDetailsType>({
        url: "/user",
        method: "GET",
    });
};