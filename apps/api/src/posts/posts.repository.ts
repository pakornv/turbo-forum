import { Injectable } from "@nestjs/common";
import { count, desc, eq } from "drizzle-orm";
import { DbService } from "src/db/db.service";
import { comments } from "src/db/schema/comments";
import { communities } from "src/db/schema/communities";
import { posts } from "src/db/schema/posts";
import { users } from "src/db/schema/users";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsRepository {
  private readonly db;

  constructor(dbService: DbService) {
    this.db = dbService.db;
  }

  async save(post: Post) {
    await this.db.insert(posts).values(post);
  }

  async findOne(id: string) {
    const result = await this.db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      title: result.title,
      body: result.body,
      authorId: result.authorId,
      communityId: result.communityId,
      createdAt: result.createdAt,
    };
  }

  async delete(id: string) {
    return await this.db.delete(posts).where(eq(posts.id, id));
  }

  async findAllLatest(authorId?: string) {
    const result = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        body: posts.body,
        createdAt: posts.createdAt,
        author: users,
        community: communities,
        commentCount: count(comments.id),
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .innerJoin(communities, eq(posts.communityId, communities.id))
      .leftJoin(comments, eq(posts.id, comments.postId))
      .where(authorId ? eq(posts.authorId, authorId) : undefined)
      .groupBy(posts.id)
      .orderBy(desc(posts.createdAt));

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
      commentCount: result.commentCount,
    }));
  }

  async findOneLatest(id: string) {
    const results = await this.db
      .select({
        id: posts.id,
        title: posts.title,
        body: posts.body,
        createdAt: posts.createdAt,
        author: users,
        community: communities,
        commentCount: count(comments.id),
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .innerJoin(communities, eq(posts.communityId, communities.id))
      .leftJoin(comments, eq(posts.id, comments.postId))
      .where(eq(posts.id, id))
      .groupBy(posts.id)
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    const result = results[0];

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
      commentCount: result.commentCount,
    };
  }
}
