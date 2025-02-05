import { Injectable } from "@nestjs/common";
import { desc, eq } from "drizzle-orm";
import { DbService } from "src/db/db.service";
import { comments } from "src/db/schema/comments";
import { posts } from "src/db/schema/posts";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsRepository {
  private readonly db;

  constructor(dbService: DbService) {
    this.db = dbService.db;
  }

  async save(comment: Comment) {
    await this.db.insert(comments).values(comment);
  }

  async findAllLatestByPostId(postId: string) {
    return this.db.query.comments.findMany({
      with: { author: true },
      where: eq(comments.postId, postId),
      orderBy: [desc(posts.createdAt)],
    });
  }
}
