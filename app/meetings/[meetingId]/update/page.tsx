import calenderApi from "@/lib/axios";
import CalenderSection from "@/app/meetings/[meetingId]/update/CalenderSection";

export default async function Page({ params }: any) {
  const { data } = await calenderApi.get(`/meetings/${params.meetingId}`);

  return <CalenderSection meeting={data} />;
}
