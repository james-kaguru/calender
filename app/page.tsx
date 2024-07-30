import { isSignedIn } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions";
import calenderApi from "@/lib/axios";
import { DateTime } from "luxon";
import queryString from "query-string";
import CalenderSection from "@/app/CalenderSection";

export default async function Home({ searchParams }: any) {
  if (!isSignedIn()) redirect("/login");
  const now = DateTime.now();

  const date = DateTime.fromObject({
    year: now.year,
    month: now.month,
    day: now.day,
  }).toISO();

  const { data } = await calenderApi.get(
    `/meetings?${queryString.stringify({ date })}`,
  );

  return (
    <div>
      <form action={logout}>
        <button>Logout</button>
      </form>
      <CalenderSection meetings={data} />
    </div>
  );
}
