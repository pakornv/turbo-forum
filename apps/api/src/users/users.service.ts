import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DbService } from "src/db/db.service";
import { users } from "src/db/schema/users";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly db;

  constructor(service: DbService) {
    this.db = service.db;
  }
  async findOneByUsername(username: string): Promise<User | null> {
    const result = await this.db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      username: result.username,
      name: result.name,
      picture: result.picture,
    };
  }
}
