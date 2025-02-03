import { PostCreateModal } from "@/app/(post)/post-create-modal";
import { PostList } from "@/app/(post)/post-list";
import { auth } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { postQueries } from "../queries";

export default async function Page() {
  const session = await auth();

  if (!session?.user.accessToken) redirect("/sign-in");

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    postQueries.list({ authorId: session.user.id }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-200">
        <div className="px-4 py-6 lg:px-10 lg:py-9">
          <div className="flex items-center justify-between gap-x-5">
            <div></div>
            <PostCreateModal />
          </div>
          <PostList authorId={session.user.id} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
