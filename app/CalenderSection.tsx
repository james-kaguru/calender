"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CreateMeetingTab from "@/app/CreateMeetingTab";

export default function CalenderSection(props: { meetings: Meeting[] }) {
  const [tab, setTab] = useState("meetings");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="container mx-auto flex flex-row gap-3">
      <div className={"w-4/12"}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date?.toDateString()}
      </div>
      <div className={"w-8/12"}>
        <Tabs value={tab} className="w-full">
          <TabsContent value="meetings">
            <button
              onClick={() => {
                setTab("create-meeting");
              }}
            >
              Create meeting
            </button>
            {props.meetings.map((meeting) => (
              <div key={meeting.id}>{meeting.id}</div>
            ))}
          </TabsContent>
          <TabsContent value="create-meeting">
            <CreateMeetingTab setTab={setTab} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
