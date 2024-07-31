"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import Meeting from "@/app/Meeting";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CalenderSection(props: { meetings: Meeting[] }) {
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (date) {
      const isoDate = DateTime.fromJSDate(date);

      router.replace(`/?${queryString.stringify({ date: isoDate })}`);
    }
  }, [date]);

  return (
    <main className="mx-auto flex flex-row gap-3">
      <div className={"w-fit"}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className={"w-full"}>
        <div className={"flex flex-row justify-end mb-3"}>
          <Link href={"/meetings/create"}>
            <Button>Create meeting</Button>
          </Link>
        </div>
        {props.meetings.map((meeting) => (
          <Meeting meeting={meeting} key={meeting.id} />
        ))}

        {props.meetings.length === 0 ? (
          <div className={"p-3 rounded border font-bold text-sm"}>
            No meetings scheduled
          </div>
        ) : null}
      </div>
    </main>
  );
}
