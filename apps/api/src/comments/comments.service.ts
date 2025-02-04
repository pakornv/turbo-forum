import { Injectable } from "@nestjs/common";
import { desc, eq } from "drizzle-orm";
import { DbService } from "src/db/db.service";
import { comments } from "src/db/schema/comments";
import { posts } from "src/db/schema/posts";
import { PostsService } from "src/posts/posts.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  private readonly db;

  constructor(
    private readonly postsService: PostsService,
    dbService: DbService,
  ) {
    this.db = dbService.db;
  }

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
    authorId: string,
  ) {
    // Ensure the post exists
    await this.postsService.findOne(postId);

    // Create the comment
    await this.db
      .insert(comments)
      .values(new Comment(postId, createCommentDto.body, authorId));
  }

  async findAllLatestByPostId(postId: string): Promise<Comment[]> {
    // Ensure the post exists
    await this.postsService.findOne(postId);

    return this.db.query.comments.findMany({
      with: { author: true },
      where: eq(comments.postId, postId),
      orderBy: [desc(posts.createdAt)],
    });
  }
}
