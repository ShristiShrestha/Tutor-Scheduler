import { UserRoles } from "../enum/UserEnum";
import { UserMiniDetailsType } from "../redux/user/types";

export const authDetails: UserMiniDetailsType = {
    email: "shristi@lsu.edu",
    roles: [UserRoles.STUDENT],
};