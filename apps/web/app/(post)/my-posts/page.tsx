import { PostList } from "@/app/(post)/post-list";
import { postQueries } from "@/app/(post)/queries";
import { auth } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user.accessToken) redirect("/sign-in");

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    postQueries.list({ authorId: session.user.id }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList authorId={session.user.id} />
    </HydrationBoundary>
  );
}
