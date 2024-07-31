import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteMeeting } from "@/app/actions";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

export default function Meeting(props: {
  meeting: Meeting;
  showDelete: boolean;
}) {
  const router = useRouter();
  const meeting = props.meeting;

  async function handleDelete() {
    const { message } = await deleteMeeting(meeting.id);
    if (message === "success") {
      router.refresh();
      toast.success("Deleted Meeting");
    } else {
      toast.error(message);
    }
  }

  return (
    <div className={"border border-gray-200 p-3 mb-3 rounded text-sm"}>
      <div className="flex flex-row items-center justify-between">
        <p className={"font-bold text-base"}>{meeting.title}</p>
        <p>
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical size={20} />
            </PopoverTrigger>
            <PopoverContent
              align={"end"}
              className={"flex flex-col p-0 text-sm w-[200px]"}
            >
              <Link
                className={"p-2 hover:bg-accent text-left"}
                href={`/meetings/${meeting.id}/update`}
              >
                Edit
              </Link>
              {props.showDelete ? (
                <button
                  className={"p-2 hover:bg-accent text-left"}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              ) : null}
            </PopoverContent>
          </Popover>
        </p>
      </div>
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
