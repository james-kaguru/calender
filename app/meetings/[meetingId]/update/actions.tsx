"use server";

import { FormSchema } from "@/app/schema";
import { DateTime } from "luxon";
import calenderApi from "@/lib/axios";
import { AxiosError } from "axios";

export async function updateMeeting(
  data: FormSchema,
  jsDate: Date,
  meetingId: number,
) {
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
    await calenderApi.patch(`/meetings/${meetingId}`, {
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
