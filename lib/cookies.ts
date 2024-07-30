import { cookies } from "next/headers";

const cookieStore = cookies();

export function setCookie(name: string, value: string) {
  cookies().set(name, value, { secure: true });
}

export function getCookie(name: string) {
  return cookies().get(name)?.value;
}

export function isSignedIn() {
  const accessToken = getCookie("accessToken");
  if (!accessToken) return false;
  return true;
}
