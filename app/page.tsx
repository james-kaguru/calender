import { isSignedIn } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions";
import calenderApi from "@/lib/axios";
import CalenderSection from "@/app/CalenderSection";

export default async function Home() {
  if (!isSignedIn()) redirect("/login");

  const { data } = await calenderApi.get("/meetings");

  return (
    <div>
      <form action={logout}>
        <button>Logout</button>
      </form>
      <CalenderSection meetings={data} />
    </div>
  );
}
