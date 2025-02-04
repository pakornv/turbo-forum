import { Injectable } from "@nestjs/common";
import { desc, eq } from "drizzle-orm";
import { DbService } from "src/db/db.service";
import { posts } from "src/db/schema/posts";
import { CreatePostDto } from "./dto/create-post.dto";
import { LatestPostDto } from "./dto/latest-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

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
  private readonly db;

  constructor(dbService: DbService) {
    this.db = dbService.db;
  }

  async create(createPostDto: CreatePostDto, authorId: string) {
    await this.db
      .insert(posts)
      .values(
        new Post(
          createPostDto.title,
          createPostDto.body,
          createPostDto.communityId,
          authorId,
        ),
      );
  }

  async findOne(id: string): Promise<Post> {
    const result = await this.db.query.posts.findFirst({
      where: eq(posts.id, id),
    });
    if (!result) {
      throw new PostNotFoundError();
    }

    const post = {
      id: result.id,
      title: result.title,
      body: result.body,
      authorId: result.authorId,
      communityId: result.communityId,
      createdAt: result.createdAt,
    };

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, actorId: string) {
    const post = await this.findOne(id);

    if (post.authorId !== actorId) throw new PostNotAllowedError();

    if (updatePostDto.title) post.title = updatePostDto.title;
    if (updatePostDto.body) post.body = updatePostDto.body;
    if (updatePostDto.communityId) post.communityId = updatePostDto.communityId;

    await this.db.update(posts).set(post).where(eq(posts.id, id));
  }

  async remove(id: string, actorId: string) {
    const post = await this.findOne(id);
    if (post.authorId !== actorId) throw new PostNotAllowedError();

    await this.db.delete(posts).where(eq(posts.id, id));
  }

  async findAllLatest(authorId?: string): Promise<LatestPostDto[]> {
    const result = await this.db.query.posts.findMany({
      with: { author: true, community: true },
      where: authorId ? eq(posts.authorId, authorId) : undefined,
      orderBy: [desc(posts.createdAt)],
    });

    return result.map((result) => ({
      id: result.id,
      title: result.title,
      body: result.body,
      author: {
        id: result.author.id,
        name: result.author.name,
        picture: result.author.picture,
      },
      community: {
        id: result.community.id,
        name: result.community.name,
      },
      createdAt: result.createdAt,
      commentCount: 0,
    }));
  }

  async findOneLatest(id: string): Promise<LatestPostDto> {
    const result = await this.db.query.posts.findFirst({
      with: { author: true, community: true },
      where: eq(posts.id, id),
    });

    if (!result) {
      throw new PostNotFoundError();
    }

    return {
      id: result.id,
      title: result.title,
      body: result.body,
      author: {
        id: result.author.id,
        name: result.author.name,
        picture: result.author.picture,
      },
      community: {
        id: result.community.id,
        name: result.community.name,
      },
      createdAt: result.createdAt,
      commentCount: 0,
    };
  }
}
