import { PostDetail } from "@/app/(post)/post-detail";
import { postQueries } from "@/app/(post)/queries";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(postQueries.detail(id));
  await queryClient.prefetchQuery(postQueries.commentList(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail id={id} />;
    </HydrationBoundary>
  );
}
