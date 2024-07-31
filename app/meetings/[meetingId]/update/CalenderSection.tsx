"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import UpdateMeetingForm from "@/app/meetings/[meetingId]/update/UpdateMeetingForm";
import { DateTime } from "luxon";

export default function CalenderSection(props: { meeting: Meeting }) {
  const [date, setDate] = useState<Date | undefined>(
    DateTime.fromISO(props.meeting.from).startOf("day").toJSDate(),
  );

  return (
    <div className={"container mx-auto flex flex-row gap-3 pt-3"}>
      <div className={"w-fit"}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className={"w-full"}>
        {date !== undefined ? (
          <UpdateMeetingForm meeting={props.meeting} date={date} />
        ) : null}
      </div>
    </div>
  );
}
