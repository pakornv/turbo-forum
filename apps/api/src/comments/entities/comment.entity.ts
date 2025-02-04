import { nanoid } from "nanoid";

export class Comment {
  id: string;
  postId: string;
  body: string;
  authorId: string;
  createdAt: string;

  constructor(postId: string, body: string, authorId: string) {
    this.id = nanoid();
    this.postId = postId;
    this.body = body;
    this.authorId = authorId;
  }
}
