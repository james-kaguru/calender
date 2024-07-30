"use server";

import { FormSchema } from "@/app/login/schema";
import axios, { AxiosError } from "axios";
import { setCookie } from "@/lib/cookies";

export async function login(data: FormSchema) {
  let message = "";

  try {
    const res = await axios.post(process.env.BACKEND_API + "/auth/login", data);

    setCookie("accessToken", res.data.accessToken);

    message = "success";
  } catch (e) {
    if (e instanceof AxiosError) {
      message = e.response?.data.message;
    }
  }
  return { message };
}
