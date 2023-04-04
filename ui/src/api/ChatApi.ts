import Api from "../utils/ApiUtils";
import {MessageType} from "../redux/chat/types";

export const postMsg = (message: MessageType) => {
    return Api.apiCall<string>({
        url: "/chat",
        method: "POST",
        data: message
    });
};

export const putMsgReceived = (ids: number[]) => {
    return Api.apiCall<string>({
        url: "/chat/received",
        method: "PUT",
        data: {id: ids}
    });
};

export const getMsgs = () => {
    return Api.apiCall<Record<string, MessageType[]>>({
        url: "/chat",
        method: "GET",
    });
};

export const getMsgsWithUser = (email: string) => {
    return Api.apiCall<MessageType[]>({
        url: `/chat/${email}`,
        method: "GET",
    });
};

