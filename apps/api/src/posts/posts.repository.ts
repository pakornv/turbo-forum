// import { Injectable } from "@nestjs/common";
// import { desc, eq } from "drizzle-orm";
// import { DbService } from "src/db/db.service";
// import { posts } from "src/db/schema/posts";
// import { NotFoundError, Post } from "./dto/post.dto";
// import { UpdatePostDto } from "./dto/update-post.dto";
// import { LatestPost } from "./latest-post";

// @Injectable()
// export class PostsRepository {
//   private readonly db: DbService["db"];

//   constructor(service: DbService) {
//     this.db = service.db;
//   }

//   async save(post: Post) {
//     await this.db.insert(posts).values({
//       id: post.id,
//       title: post.title,
//       body: post.body,
//       communityId: post.communityId,
//       authorId: post.authorId,
//     });
//   }

//   async findAll(authorId?: string): Promise<LatestPost[]> {
//     const result = await this.db.query.posts.findMany({
//       with: { author: true, community: true },
//       where: authorId ? eq(posts.authorId, authorId) : undefined,
//       orderBy: [desc(posts.createdAt)],
//     });

//     return result.map((result) => ({
//       id: result.id,
//       title: result.title,
//       body: result.body,
//       author: {
//         id: result.author.id,
//         name: result.author.name,
//         picture: result.author.picture,
//       },
//       community: {
//         id: result.community.id,
//         name: result.community.name,
//       },
//       createdAt: result.createdAt,
//       commentCount: 0,
//     }));
//   }

//   async findOne(id: string): Promise<Post> {
//     const result = await this.db.query.posts.findFirst({
//       where: eq(posts.id, id),
//     });

//     if (!result) {
//       throw NotFoundError;
//     }

//     const post = {
//       id: result.id,
//       title: result.title,
//       body: result.body,
//       authorId: result.authorId,
//       communityId: result.communityId,
//       createdAt: result.createdAt,
//     };

//     return post;
//   }

//   async update(post: UpdatePostDto) {
//     //   title: string | undefined,
//     //   body: string | undefined,
//     //   communityId: string | undefined,
//     //   actorId: string,
//     // ) {
//     //   if (this.authorId !== actorId) throw NotAllowedError;
//     //   if (title) this.title = title;
//     //   if (body) this.body = body;
//     //   if (communityId) this.communityId = communityId;
//     //   // this.updatedAt = new Date().toISOString();
//   }

//   async remove(id: string) {
//     await this.db.delete(posts).where(eq(posts.id, id));
//   }
// }
