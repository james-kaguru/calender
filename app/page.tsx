import CalenderSection from "@/app/CalenderSection";
import { isSignedIn } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions";

export default async function Home() {
  if (!isSignedIn()) redirect("/login");

  return (
    <>
      <form action={logout}>
        <button>Logout</button>
      </form>
      <CalenderSection />
    </>
  );
}
