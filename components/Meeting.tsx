import { DateTime } from "luxon";

export default function Meeting(props: { meeting: Meeting }) {
  const meeting = props.meeting;

  return (
    <div className={"border border-gray-200 p-3 mb-3 rounded text-sm"}>
      <p className={"font-bold text-base"}>{meeting.title}</p>
      <p>{meeting.description}</p>
      <div className={"flex flex-row justify-between"}>
        <p suppressHydrationWarning>
          <b>Start time: </b>
          {DateTime.fromISO(meeting.from).toLocaleString({
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p suppressHydrationWarning>
          <b>End time: </b>
          {DateTime.fromISO(meeting.to).toLocaleString({
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
