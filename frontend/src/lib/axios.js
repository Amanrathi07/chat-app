import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:4000/v1" : "/v1",
  withCredentials: true,
});
