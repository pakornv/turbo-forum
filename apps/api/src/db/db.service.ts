import { Injectable } from "@nestjs/common";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql/node";
import * as comments from "./schema/comments";
import { communities } from "./schema/communities";
import * as posts from "./schema/posts";

import { users } from "./schema/users";

@Injectable()
export class DbService {
  readonly db;

  constructor() {
    this.db = drizzle({
      schema: { communities, users, ...posts, ...comments },
      connection: { url: process.env.DB_FILE_NAME },
      casing: "snake_case",
    });
  }
}
