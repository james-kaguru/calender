import { useRouter } from "next/navigation";
import { useState } from "react";
import Meeting from "@/components/Meeting";
import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "@/app/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateMeeting } from "@/app/meetings/[meetingId]/update/actions";
import Link from "next/link";
import { toast } from "sonner";

export default function UpdateMeetingForm(props: {
  meeting: Meeting;
  date: Date;
}) {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.meeting.title,
      description: props.meeting.description,
      from: "",
      to: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    const from = parseInt(data.from.slice(0, 2));
    const to = parseInt(data.to.slice(0, 2));
    const fromMinutes = parseInt(data.from.slice(-2));
    const toMinutes = parseInt(data.to.slice(-2));

    if (from > to) {
      form.setError("to", {
        message: "Meeting cannot end earlier than start time.",
      });
      return;
    }

    if (from === to && fromMinutes === toMinutes) {
      form.setError("to", {
        message: "Meeting cannot start and end at the same time.",
      });
      return;
    }

    if (from === to && fromMinutes > toMinutes) {
      form.setError("to", {
        message: "Meeting cannot end earlier than start time.",
      });
      return;
    }

    const { meetings, message } = await updateMeeting(
      data,
      props.date,
      props.meeting.id,
    );

    setMeetings(meetings);

    if (message === "success") {
      toast.success("Update meeting successfully");
      router.replace("/");
    } else {
      form.setError("from", {
        message,
      });
    }
  }

  return (
    <div className={""}>
      <p className={"w-fit mx-auto"}>
        Scheduling a meeting for :<b>{props.date.toDateString()}</b>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Board Meeting" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="All hands in meeting"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start time</FormLabel>
                <FormControl>
                  <Input {...field} type={"time"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End time</FormLabel>
                <FormControl>
                  <Input {...field} type={"time"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={"flex flex-row items-center justify-between"}>
            <Link href={"/"}>
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </Link>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>

      {meetings.length > 0 ? (
        <>
          <p className={"text-sm p-3 my-3"}>
            Meeting collides with the following meetings
          </p>
          {meetings.map((meeting) => (
            <Meeting key={meeting.id} meeting={meeting} showDelete={false} />
          ))}
        </>
      ) : null}
    </div>
  );
}
