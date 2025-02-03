import { Injectable } from "@nestjs/common";
import { desc, eq } from "drizzle-orm";
import { DbService } from "src/db/db.service";
import { posts } from "src/db/schema/posts";
import { LatestPost } from "./entities/latest-post-entity";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsRepository {
  private readonly db: DbService["db"];

  constructor(service: DbService) {
    this.db = service.db;
  }

  async save(post: Post) {
    await this.db.insert(posts).values({
      id: post.id,
      title: post.title,
      body: post.body,
      communityId: post.communityId,
      authorId: post.authorId,
    });
  }

  async findAll(authorId?: string) {
    const result = await this.db.query.posts.findMany({
      with: { author: true, community: true },
      where: authorId ? eq(posts.authorId, authorId) : undefined,
      orderBy: [desc(posts.createdAt)],
    });

    return result.map<LatestPost>((result) => ({
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
}
