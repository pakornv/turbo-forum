import { nanoid } from "nanoid";

export class Post {
  id: string;
  title: string;
  body: string;
  communityId: string;
  authorId: string;
  createdAt: string;

  constructor(
    title: string,
    body: string,
    communityId: string,
    authorId: string,
  ) {
    this.id = nanoid();
    this.title = title;
    this.body = body;
    this.communityId = communityId;
    this.authorId = authorId;
  }
}
