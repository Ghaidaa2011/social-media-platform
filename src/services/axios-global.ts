import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://tarmeezacademy.com/api/v1",
});

export default api;