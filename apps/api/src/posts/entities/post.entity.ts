export class Post {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  commentCount: number;
  community: {
    name: string;
  };
  author: {
    name: string;
    image: string;
  };
  comments: {
    id: string;
    body: string;
    createdAt: string;
    creator: {
      name: string;
      image?: string;
    };
  }[];
}
