"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalenderSection(props: { meetings: Meeting[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date?.toDateString()}
      </div>
      <div>
        {props.meetings.map((meeting) => (
          <div key={meeting.id}>{meeting.id}</div>
        ))}
      </div>
    </main>
  );
}
