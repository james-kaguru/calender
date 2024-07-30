import axios from "axios";
import { getCookie } from "@/lib/cookies";

const calenderApi = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

calenderApi.interceptors.request.use(async (config) => {
  const accessToken = await getCookie("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
