export class LatestPostDto {
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
}
