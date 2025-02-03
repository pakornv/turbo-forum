"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  title: zfd.text(z.string().min(2)),
  body: zfd.text(z.string().min(2)),
  communityId: zfd.text(z.string()),
});

export const createPost = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user.accessToken) redirect("/sign-in");

    const res = await fetch(`${process.env.API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) throw new Error("Failed to create post");

    revalidatePath("/(post)", "layout");
  });
