import Api from "../utils/ApiUtils";
import { UserMiniDetailsType } from "../redux/user/types";
import { SignupType } from "../redux/auth/types";
import { capitalize } from "../utils/StringUtils";

export const authenticate = () => {
    return Api.apiCall<UserMiniDetailsType>({
        url: "/auth/profile",
        method: "GET",
    });
};

// todo: /user/signup
export const signup = data => {
    const signupData: SignupType = {
        ...data,
        name: capitalize(
            data["name"] || data["email"]?.split("@")[0] || "no name",
        ),
        isCoordinator: false,
    };
    return Api.apiCall<UserMiniDetailsType>({
        url: "/user/signup",
        method: "POST",
        data: signupData,
    });
};

export const login = data => {
    return Api.apiCall<UserMiniDetailsType>({
        url: "/auth/login",
        method: "POST",
        data: data,
    });
};

export const logout = () => {
    return Api.apiCall({
        url: "/auth/logout",
        method: "GET",
    });
};