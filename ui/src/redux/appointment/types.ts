/******************* actions ************************/
import { AppointmentStatus } from "../../enum/AppointmentEnum";
import { UserDetailsType } from "../user/types";

export const CREATE_APPOINTMENT = "CREATE_APPOINTMENT";
export const FETCH_APPOINTMENTS = "FETCH_APPOINTMENTS";
export const FETCH_APPOINTMENT = "FETCH_APPOINTMENT";
export const UPDATE_APPOINTMENT = "UPDATE_APPOINTMENT";
export const RATE_APPOINTMENT = "RATE_APPOINTMENT";
export const UPDATE_APPOINTMENTS_RECEIVED = "UPDATE_APPOINTMENTS_RECEIVED";
export const SET_APPOINTMENTS = "SET_APPOINTMENTS";
export const SET_APPOINTMENT = "SET_APPOINTMENT";
export const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";
export const ACCEPT_APPOINTMENT = "ACCEPT_APPOINTMENT";
export const REJECT_APPOINTMENT = "REJECT_APPOINTMENT";

export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

/******************* props ************************/

export type AppointmentType = {
    id: number;
    studentId: number;
    tutorId: number;
    status: AppointmentStatus;
    statusMessage?: string;
    studentNote?: string;
    tutoringOnList: string[];
    scheduledAt: Date;
    clientReceivedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    student: UserDetailsType;
    tutor: UserDetailsType;
};

export type AppointmentParams = {
    tutorId?: number;
    studentId?: number;
    month?: string;
    year?: string;
    upcoming?: boolean;
};


/******************* states ************************/
export type AppointmentState = {
    appointment?: AppointmentType;
    upcomingAppointments: AppointmentType[];
    otherAppointments: AppointmentType[];
    notifications: AppointmentType[];
};
