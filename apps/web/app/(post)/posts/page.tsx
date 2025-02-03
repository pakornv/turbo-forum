import { CreatePostModal } from "@/app/(post)/create-post-modal";
import { PostList } from "@/app/(post)/post-list";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { postQueries } from "../queries";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(postQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-200">
        <div className="px-4 py-6 lg:px-10 lg:py-9">
          <div className="flex items-center justify-between gap-x-5">
            <div></div>
            <CreatePostModal />
          </div>
          <PostList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
