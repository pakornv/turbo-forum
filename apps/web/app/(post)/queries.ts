import { queryOptions } from "@tanstack/react-query";

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

export const postQueries = {
  all: ["posts"],
  list: (filters?: ListPostsFilters) =>
    queryOptions({
      queryKey: [...postQueries.all, filters],
      queryFn: async () => listPosts(filters),
    }),
  detail: (postId: string) =>
    queryOptions({
      queryKey: [...postQueries.all, postId],
      queryFn: async () => getPost(postId),
      enabled: !!postId,
    }),
  commentList: (postId: string) =>
    queryOptions({
      queryKey: [...postQueries.detail(postId).queryKey, "comments"],
      queryFn: async () => listComments(postId),
      enabled: !!postId,
    }),
};

async function listPosts(filters?: ListPostsFilters) {
  const baseUrl = process.env.API_BASE_URL ?? "/api";
  const res = await fetch(
    `${baseUrl}/posts?${new URLSearchParams(filters as Record<string, string>).toString()}`,
  );
  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json() as Promise<Post[]>;
}

async function getPost(postId: string) {
  const baseUrl = process.env.API_BASE_URL ?? "/api";
  const res = await fetch(`${baseUrl}/posts/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch post");

  return res.json() as Promise<Post>;
}

async function listComments(postId: string) {
  const baseUrl = process.env.API_BASE_URL ?? "/api";
  const res = await fetch(`${baseUrl}/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch post");

  return res.json() as Promise<Comment[]>;
}

type Community = {
  id: string;
  name: string;
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

export type ListPostsFilters = {
  authorId?: string;
  search?: string;
};

export type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    picture: string;
  };
};
