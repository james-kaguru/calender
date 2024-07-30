"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  cookies().set("accessToken", "", { expires: 1 });
  redirect("/login");
}
