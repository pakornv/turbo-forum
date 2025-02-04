"use server";

import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { _signIn, auth } from ".";

const schema = zfd.formData({
  username: zfd.text(z.string()),
});

export const signIn = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username } }) => {
    await _signIn("credentials", { username, redirectTo: "/posts" });
  });

export async function requireAuth() {
  const session = await auth();
  if (!session?.user.accessToken) {
    redirect("/sign-in");
  }
  return;
}
