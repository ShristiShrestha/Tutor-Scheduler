import {UserRoles} from "../enum/UserEnum";
import {UserMiniDetailsType} from "../redux/user/types";

export const authDetails: UserMiniDetailsType = {
    username: "shristi@lsu.edu",
    email: "shristi@lsu.edu",
    roles: [UserRoles.STUDENT],
};