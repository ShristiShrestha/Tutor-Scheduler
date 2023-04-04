import Api from "../utils/ApiUtils";
import {UserMiniDetailsType} from "../redux/user/types";
import {SignupType} from "../redux/auth/types";
import {capitalize} from "../utils/StringUtils";

export const authenticate = () => {
    return Api.apiCall<UserMiniDetailsType>({
        url: "/authenticate",
        method: "POST",
    });
};

// todo: /user/signup
export const signup = (data) => {
    const signupData: SignupType = {
        ...data,
        name: capitalize(data["email"]?.split("@")[0] || "no name"),
        isTutor: false,
    }
    return Api.apiCall<UserMiniDetailsType>({
        url: "/signup",
        method: "POST",
        data: signupData
    })
}

export const login = (data) => {
    return Api.apiCall<UserMiniDetailsType>({
        url: "/login",
        method: "POST",
        data: data
    })
}