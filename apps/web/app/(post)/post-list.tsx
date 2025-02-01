"use client";

import { Button } from "@repo/ui/button";
import { Link } from "@repo/ui/link";
import { useQuery } from "@tanstack/react-query";
import { PostItem } from "./post-item";
import { postQueries } from "./queries";

export function PostList() {
  const posts = useQuery(postQueries.list({ search: "" }));

  if (posts.isPending) {
    return <span>Loading...</span>;
  }

  if (posts.isError) {
    throw posts.error;
  }

  return (
    <div className="max-w-200">
      <div className="px-4 py-6 lg:px-10 lg:py-9">
        <div className="flex items-center justify-between gap-x-5">
          <div></div>
          <Button>Create +</Button>
        </div>
        <div className="mt-5 rounded-xl bg-white">
          <ul role="list" className="divide-y divide-ui-grey-100">
            {posts.data.map((post) => (
              <li key={post.id} className="py-4">
                <Link href={`/posts/${post.id}`}>
                  <PostItem post={post} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
