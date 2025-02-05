import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";
import { PostsRepository } from "./posts.repository";

export class PostNotFoundError extends Error {
  constructor() {
    super("Post not found");
    this.name = "PostNotFoundError";
  }
}

export class PostNotAllowedError extends Error {
  constructor() {
    super("You are not allowed to perform this action");
    this.name = "PostNotAllowedError";
  }
}

@Injectable()
export class PostsService {
  constructor(private readonly repo: PostsRepository) {}

  async create(createPostDto: CreatePostDto, authorId: string) {
    const post = new Post(
      createPostDto.title,
      createPostDto.body,
      createPostDto.communityId,
      authorId,
    );
    await this.repo.save(post);

    return post.id;
  }

  async findOne(id: string) {
    const post = await this.repo.findOne(id);
    if (!post) throw new PostNotFoundError();

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, actorId: string) {
    const post = await this.findOne(id);

    if (post.authorId !== actorId) throw new PostNotAllowedError();

    if (updatePostDto.title) post.title = updatePostDto.title;
    if (updatePostDto.body) post.body = updatePostDto.body;
    if (updatePostDto.communityId) post.communityId = updatePostDto.communityId;

    await this.repo.save(post);
  }

  async remove(id: string, actorId: string) {
    const post = await this.findOne(id);
    if (post.authorId !== actorId) throw new PostNotAllowedError();

    return this.repo.delete(id);
  }

  async findAllLatest(authorId?: string) {
    return this.repo.findAllLatest(authorId);
  }

  async findOneLatest(id: string) {
    const post = await this.repo.findOneLatest(id);
    if (!post) throw new PostNotFoundError();

    return post;
  }
}
