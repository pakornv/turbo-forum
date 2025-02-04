import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { posts } from "./posts";
import { users } from "./users";

export const comments = sqliteTable("comments", {
  autoId: int().primaryKey({ autoIncrement: true }),
  id: text().notNull().unique(),
  postId: text().notNull(),
  body: text().notNull(),
  authorId: text().notNull(),
  createdAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, { fields: [comments.authorId], references: [users.id] }),
  post: one(posts, {
    fields: [comments.id],
    references: [posts.id],
  }),
}));
