export class LatestPost {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  commentCount: number;
  community: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
    picture: string;
  };
  // comments: {
  //   id: string;
  //   body: string;
  //   createdAt: string;
  //   creator: {
  //     name: string;
  //     image?: string;
  //   };
  // }[];
}
