import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const communities = sqliteTable("communities", {
  autoId: int().primaryKey({ autoIncrement: true }),
  id: text().notNull().unique(),
  name: text().notNull().unique(),
  createdAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});
