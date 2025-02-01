"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { _signIn } from ".";

const schema = z.object({
  username: z.string().min(3).max(10),
});

export const signIn = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username } }) => {
    await _signIn("credentials", { username, redirectTo: "/posts" });

    return {
      success: "Successfully logged in",
    };
  });
