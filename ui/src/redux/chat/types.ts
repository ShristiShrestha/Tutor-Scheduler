/******************* actions ************************/

export const SEND_MESSAGE = "SEND_MESSAGE";

// fetch chat conversation of logged user with the other user
export const FETCH_USER_CONV = "FETCH_USER_CONV";
export const SET_USER_CONV = "SET_USER_CONV";

// fetch chat conversation of logged user with the other userS
export const FETCH_USERS_CONV = "FETCH_USERS_CONV";
export const SET_USERS_CONVS = "SET_USERS_CONVS";

export const UPDATE_MESSAGE_RECEIVED = "UPDATE_MESSAGE_RECEIVED";

/******************* props ************************/

export type MessageType = {
    id: number;
    senderEmail: string;
    receiverEmail: string;
    sentAt: Date;
    receivedAt?: Date;
    message: string;
}

/******************* states ************************/

export type ChatState = {
    userMessages: MessageType[],
    usersMessages: Record<string, MessageType[]>
}
