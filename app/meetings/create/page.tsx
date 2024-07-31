"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import CreateMeetingForm from "@/app/meetings/create/CreateMeetingForm";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className={"container mx-auto flex flex-row"}>
      <div className={"w-4/12"}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className={"w-4/12"}>
        <CreateMeetingForm date={date} />
      </div>
    </div>
  );
}
