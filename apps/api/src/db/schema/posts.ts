import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { communities } from "./communities";
import { users } from "./users";

export const posts = sqliteTable("posts", {
  autoId: int().primaryKey({ autoIncrement: true }),
  id: text().notNull(),
  title: text().notNull(),
  body: text().notNull(),
  communityId: text().notNull(),
  authorId: text().notNull(),
  createdAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  community: one(communities, {
    fields: [posts.communityId],
    references: [communities.id],
  }),
}));
