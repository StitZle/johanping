import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:9090/frontend-service/rest";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
