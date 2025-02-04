"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  body: zfd.text(z.string()),
});

export const createComment = actionClient
  .schema(schema)
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .action(async ({ parsedInput, bindArgsParsedInputs: [postId] }) => {
    const session = await auth();
    if (!session?.user.accessToken) redirect("/sign-in");

    const res = await fetch(
      `${process.env.API_BASE_URL}/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(parsedInput),
      },
    );

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to create comment");
    }

    revalidatePath("/(post)", "layout");
  });

export async function checkAuth() {
  const session = await auth();
  if (!session?.user.accessToken) redirect("/sign-in");
}
