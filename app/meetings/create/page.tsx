"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import CreateMeetingForm from "@/app/meetings/create/CreateMeetingForm";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
          <CreateMeetingForm date={date} />
        ) : (
          <p className={"rounded border text-sm font-bold"}>Select date</p>
        )}
      </div>
    </div>
  );
}
