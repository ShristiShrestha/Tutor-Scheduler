import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as _ from "lodash";
import { getAxiosInstance } from "./AxiosUtils";

export default class Api {
    public static baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";
    public static apiVersion = "";
    public static axiosInstance: AxiosInstance = getAxiosInstance(
        Api.baseURL,
        Api.apiVersion,
    );

    static validateStatus(extra: Array<number>) {
        return function validate(status: number) {
            return (status >= 200 && status < 300) || extra.includes(status);
        };
    }

    static apiCall<T>(config: AxiosRequestConfig): Promise<T> {
        return Api.axiosInstance
            .request<T>({
                validateStatus: Api.validateStatus([]),
                ...config,
            })
            .then(response => {
                return Api.handleResponse(response);
            })
            .catch(error => {
                return Api.handleError(error);
            });
    }
    static handleResponse<T>(response: AxiosResponse<T>): Promise<T> {
        return Promise.resolve<T>(response.data);
    }

    static handleError<T>(error: any) {
        if (
            _.get(error, "constructor.name", null) === "Cancel" ||
            axios.isCancel(error)
        ) {
            return new Promise<T>(() => {}); // Lost promise
        }
        if (error && error.response && error.response.status === 403) {
            // TODO : 403 api call here
            return Promise.reject<T>(error);
        }
        return Promise.reject<T>(error);
    }
}
