import { queryOptions } from "@tanstack/react-query";

type PostFilters = {
  search?: string;
};

type Post = {
  id: string;
  title: string;
  body: string;
  commentCount: number;
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
  };
};

export const postQueries = {
  all: ["posts"],
  list: (filters: PostFilters) =>
    queryOptions({
      queryKey: [...postQueries.all, filters],
      queryFn: async () => {
        const res = await fetch(`http://localhost:3001/posts`);
        const data = await res.json();
        return data as Post[];
      },
    }),
};
