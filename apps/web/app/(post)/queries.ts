import { queryOptions } from "@tanstack/react-query";

export type ListPostsFilters = {
  authorId?: string;
  search?: string;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  commentCount: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    picture: string;
  };
  community: {
    id: string;
    name: string;
  };
};

export async function listPosts(filters?: ListPostsFilters) {
  const baseUrl = process.env.API_BASE_URL ?? "/api";

  const res = await fetch(
    `${baseUrl}/posts?${new URLSearchParams(filters as Record<string, string>).toString()}`,
  );
  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json() as Promise<Post[]>;
}

export async function getPost(postId: string) {
  const baseUrl = process.env.API_BASE_URL ?? "/api";

  const res = await fetch(`${baseUrl}/posts/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch post");

  return res.json() as Promise<Post>;
}

export const postQueries = {
  all: ["posts"],
  list: (filters?: ListPostsFilters) =>
    queryOptions({
      queryKey: [...postQueries.all, filters],
      queryFn: async () => {
        const data = await listPosts(filters);
        return data;
      },
    }),
  detail: (postId: string) =>
    queryOptions({
      queryKey: [...postQueries.all, postId],
      queryFn: async () => {
        const post = await getPost(postId);
        return post;
      },
      enabled: !!postId,
    }),
};

type Community = {
  id: string;
  name: string;
};

export const communityQueries = {
  all: ["communities"],
  list: () =>
    queryOptions({
      queryKey: [...communityQueries.all],
      queryFn: async () => {
        const res = await fetch(`/api/communities`);
        if (!res.ok) throw new Error("Failed to fetch communities");

        return res.json() as Promise<Community[]>;
      },
    }),
};
