import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql/node";
import * as comments from "./schema/comments";
import * as communities from "./schema/communities";
import * as posts from "./schema/posts";
import * as users from "./schema/users";

if (!process.env.DB_FILE_NAME) {
  throw new Error("DB_FILE_NAME environment variable is not set");
}

export const db = drizzle({
  schema: { ...communities, ...users, ...posts, ...comments },
  connection: { url: process.env.DB_FILE_NAME },
  casing: "snake_case",
});
