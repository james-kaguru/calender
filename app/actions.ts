"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormSchema } from "@/app/schema";
import calenderApi from "@/lib/axios";
import { DateTime } from "luxon";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export async function logout() {
  cookies().set("accessToken", "", { expires: 1 });
  redirect("/login");
}

export async function createMeeting(data: FormSchema, jsDate: Date) {
  const selectedDate = DateTime.fromJSDate(jsDate);

  const from = DateTime.fromObject({
    month: selectedDate.month,
    day: selectedDate.day,
    hour: parseInt(data.from.slice(0, 2)),
    minute: parseInt(data.from.slice(-2)),
  });

  const to = DateTime.fromObject({
    month: selectedDate.month,
    day: selectedDate.day,
    hour: parseInt(data.to.slice(0, 2)),
    minute: parseInt(data.to.slice(-2)),
  });

  let message = "";

  try {
    const res = await calenderApi.post("/meetings", {
      title: data.title,
      description: data.description,
      from,
      to,
    });

    message = "success";
    revalidatePath("/");
  } catch (e) {
    if (e instanceof AxiosError) {
      message = e.response?.data.message;
    }
  }

  return { message };
}
