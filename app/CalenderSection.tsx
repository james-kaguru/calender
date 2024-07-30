"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CreateMeetingTab from "@/app/CreateMeetingTab";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";

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
      </div>
      <div className={"w-8/12"}>
        <Tabs value={tab} className="w-full">
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
              <div
                key={meeting.id}
                className={"border border-gray-200 p-3 mb-3 rounded text-sm"}
              >
                <p className={"font-bold text-base"}>{meeting.title}</p>
                <p>{meeting.description}</p>
                <div className={"flex flex-row justify-between"}>
                  <p suppressHydrationWarning>
                    <b>Start time: </b>
                    {DateTime.fromISO(meeting.from).toLocaleString(
                      DateTime.DATETIME_SHORT,
                    )}
                  </p>
                  <p suppressHydrationWarning>
                    <b>End time: </b>
                    {DateTime.fromISO(meeting.to).toLocaleString(
                      DateTime.DATETIME_SHORT,
                    )}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="create-meeting">
            <CreateMeetingTab setTab={setTab} date={date} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
