import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { Community } from "./entities/community.entity";

@Injectable()
export class CommunitiesRepository {
  private readonly db: DbService["db"];

  constructor(service: DbService) {
    this.db = service.db;
  }

  async findAll() {
    const result = await this.db.query.communities.findMany();

    const communities = result.map<Community>((result) => ({
      id: result.id,
      name: result.name,
      createdAt: result.createdAt,
    }));

    return communities;
  }
}
