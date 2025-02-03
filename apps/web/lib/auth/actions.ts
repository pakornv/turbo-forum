"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { _signIn } from ".";

const schema = zfd.formData({
  username: zfd.text(z.string().min(2)),
});

export const signIn = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username } }) => {
    await _signIn("credentials", { username, redirectTo: "/posts" });
    return;
  });
