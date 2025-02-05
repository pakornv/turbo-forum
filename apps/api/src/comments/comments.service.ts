import { Injectable } from "@nestjs/common";
import { PostsRepository } from "src/posts/posts.repository";
import { PostNotFoundError } from "src/posts/posts.service";
import { CommentsRepository } from "./comments.repository";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    private readonly postsRepo: PostsRepository,
    private readonly commentsRepo: CommentsRepository,
  ) {}

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
    authorId: string,
  ) {
    if ((await this.postsRepo.findOne(postId)) === null) {
      throw new PostNotFoundError();
    }

    const comment = new Comment(postId, createCommentDto.body, authorId);
    await this.commentsRepo.save(comment);

    return comment.id;
  }

  async findAllLatestByPostId(postId: string) {
    return await this.commentsRepo.findAllLatestByPostId(postId);
  }
}
