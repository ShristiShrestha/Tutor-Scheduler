import Api from "../utils/ApiUtils";
import { UserMiniDetailsType } from "../redux/user/types";

export const authenticate = () => {
    return Api.apiCall<UserMiniDetailsType>({
        url: "/authenticate",
        method: "POST",
    });
};