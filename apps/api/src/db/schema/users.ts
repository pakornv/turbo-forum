import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  autoId: int().primaryKey({ autoIncrement: true }),
  id: text().notNull().unique(),
  username: text().notNull().unique(),
  name: text().notNull(),
  picture: text().notNull(),
  createdAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
