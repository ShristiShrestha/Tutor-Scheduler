import allLoadings from "./allLoadings/reducer";
import allErrors from "./allErrors/reducer";
import activePath from "./activepath/reducer";
import appointment from "./appointment/reducer";
import auth from "./auth/reducer";
import chat from "./chat/reducer";
import user from "./user/reducer";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    activePath,
    allLoadings,
    allErrors,
    appointment,
    auth,
    chat,
    user,
};
