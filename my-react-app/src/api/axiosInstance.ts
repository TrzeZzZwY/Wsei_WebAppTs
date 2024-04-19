import axios, { AxiosInstance } from "axios";

export const axiosInstance:AxiosInstance = axios.create(
    {
        baseURL: "https://jsonplaceholder.typicode.com/",
        headers: {
            "Content-Type" : "application/json; charset=UTF-8"
        }
    }
)