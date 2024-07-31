"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CreateMeetingForm from "@/app/CreateMeetingForm";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import Meeting from "@/components/Meeting";

export default function CalenderSection(props: { meetings: Meeting[] }) {
  const router = useRouter();

  const [tab, setTab] = useState("meetings");
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (date) {
      const isoDate = DateTime.fromJSDate(date);

      router.replace(`/?${queryString.stringify({ date: isoDate })}`);
    }
  }, [date]);

  return (
    <main className="container mx-auto flex flex-row gap-3">
      <div className={"w-4/12"}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className={"w-8/12"}>
        <Tabs value={tab} className="w-full">
          {tab}
          <TabsContent value="meetings">
            <div className={"flex flex-row justify-end mb-3"}>
              <Button
                onClick={() => {
                  setTab("create-meeting");
                }}
              >
                Create meeting
              </Button>
            </div>

            {props.meetings.map((meeting) => (
              <Meeting meeting={meeting} key={meeting.id} />
            ))}
          </TabsContent>
          <TabsContent value="create-meeting">
            <CreateMeetingForm setTab={setTab} date={date} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
