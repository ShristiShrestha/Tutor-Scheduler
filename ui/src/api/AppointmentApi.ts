import Api from "../utils/ApiUtils";
import {AppointmentParams, AppointmentType} from "../redux/appointment/types";

export const postApt = (data: AppointmentType) => {
    return Api.apiCall<AppointmentType>({
        url: "/appointment",
        method: "POST",
        data: data
    })
}

export const getApts = (params: AppointmentParams) => {
    return Api.apiCall<AppointmentType[]>({
        url: "/appointment",
        method: "GET",
        params: params
    })
}

export const getOneApt = (id: number) => {
    return Api.apiCall<AppointmentType>({
        url: "/appointment/" + id,
        method: "GET"
    })
}

export const putApt = (appointment: AppointmentType) => {
    return Api.apiCall<AppointmentType>({
        url: "/appointment/",
        method: "PUT",
        data: appointment
    })
}

// inform server that the appointment has been received by the tutor
// use case: acknowledge new notifications (remove green dot)
export const putAptsReceived = (ids: number[]) => {
    return Api.apiCall<AppointmentType[]>({
        url: "/appointment/received",
        method: "PUT",
        data: {"id": ids}
    })
}

//  rating ranges from 1 to 4 (angry to happy)
export const putRateApt = (id: number, rating: number) => {
    return Api.apiCall<AppointmentType>({
        url: `/appointment/${id}/rate`,
        method: "PUT",
        data: {"rating": rating}
    })
}

export const deleteApt = (id: number) => {
    return Api.apiCall<string>({
        url: "/appointment/" + id,
        method: "DELETE",
    })
}