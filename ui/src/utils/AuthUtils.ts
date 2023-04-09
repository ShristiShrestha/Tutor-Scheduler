import {UserRoles} from "../enum/UserEnum";
import {UserDetailsType} from "../redux/user/types";

export const isLoggedTutor = (loggedUser: UserDetailsType) => {
    const hasTutorRole = loggedUser ? loggedUser.roles.filter(item => item.name === UserRoles.TUTOR) : [];
    return loggedUser && loggedUser.isTutor && hasTutorRole.length > 0;
}

export const isLoggedStudent = (loggedUser: UserDetailsType) => {
    const hasStdRole = loggedUser ? loggedUser.roles.filter(item => item.name === UserRoles.STUDENT) : [];
    return loggedUser && !loggedUser.isTutor && hasStdRole.length > 0;
}
export const isLoggedModerator = (loggedUser: UserDetailsType) => {
    const hasModRole = loggedUser ? loggedUser.roles.filter(item => item.name === UserRoles.MODERATOR) : [];
    return loggedUser && !loggedUser.isTutor && hasModRole.length > 0;
}