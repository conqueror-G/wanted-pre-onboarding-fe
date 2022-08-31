import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com",
  timeout: 3000,
});
