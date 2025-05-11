import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export const setGuestToken = async () => {
  const userGuestToken = cookies().get("guest");

  if (!userGuestToken?.value) {
    const randomString = nanoid(64); // Generate a 64-character random string
    cookies().set("guest", randomString, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }
};
