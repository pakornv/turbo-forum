"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const createPostSchema = zfd.formData({
  title: zfd.text(z.string()),
  body: zfd.text(z.string()),
  communityId: zfd.text(z.string()),
});

export const createPost = actionClient
  .schema(createPostSchema)
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

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to create post");
    }

    revalidatePath("/(post)", "layout");
  });

export const updatePost = actionClient
  .schema(createPostSchema)
  .bindArgsSchemas<[id: z.ZodString]>([z.string()])
  .action(async ({ parsedInput, bindArgsParsedInputs: [id] }) => {
    const session = await auth();
    if (!session?.user.accessToken) redirect("/sign-in");

    const res = await fetch(`${process.env.API_BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify(parsedInput),
    });

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to update post");
    }

    revalidatePath("/(post)", "layout");
  });

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user.accessToken) redirect("/sign-in");

  const res = await fetch(`${process.env.API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${session?.user.accessToken}` },
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to delete post");
  }

  revalidatePath("/(post)", "layout");
}
