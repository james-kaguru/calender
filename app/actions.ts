"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormSchema } from "@/app/schema";
import { DateTime } from "luxon";
import { AxiosError } from "axios";
import calenderApi from "@/lib/axios";

export async function logout() {
  cookies().set("accessToken", "", { expires: 1 });
  redirect("/login");
}

export async function createMeeting({
  data,
  jsDate,
}: {
  data: FormSchema;
  jsDate: Date;
}) {
  console.log("createMeeting");
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
  let meetings: Meeting[] = [];

  try {
    await calenderApi.post("/meetings", {
      title: data.title,
      description: data.description,
      from,
      to,
    });

    message = "success";
    meetings = [];
    console.log("success");
  } catch (e) {
    if (e instanceof AxiosError) {
      meetings = [...e.response?.data.meetings];
      message = e.response?.data.message;
    }
    console.log("error");
  }

  return { message, meetings };
}

export async function deleteMeeting(id: number) {
  let message = "";

  try {
    await calenderApi.delete(`/meetings/${id}`);

    message = "success";
  } catch (e) {
    if (e instanceof AxiosError) {
      message = e.response?.data.message;
    }
  }

  return { message };
}
