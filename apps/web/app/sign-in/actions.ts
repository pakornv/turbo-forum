"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
// import { zfd } from "zod-form-data";
import { signIn } from "@/lib/auth";

const schema = z.object({
  username: z.string().min(3).max(10),
});

export const signInAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username } }) => {
    await signIn("credentials", { username, redirectTo: "/posts" });

    return {
      success: "Successfully logged in",
    };
  });
