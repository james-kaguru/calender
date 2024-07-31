"use server";

import { FormSchema } from "@/app/login/schema";
import { AxiosError } from "axios";
import { setCookie } from "@/lib/cookies";
import calenderApi from "@/lib/axios";

export async function signup(data: FormSchema) {
  let message = "";

  try {
    const res = await calenderApi.post("/auth/signup", {
      ...data,
    });

    setCookie("accessToken", res.data.accessToken);

    message = "success";
  } catch (e) {
    if (e instanceof AxiosError) {
      message = e.response?.data.message;
    }
  }
  return { message };
}
