import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";

@Injectable()
export class CommunitiesService {
  private readonly db;

  constructor(dbService: DbService) {
    this.db = dbService.db;
  }

  findAll() {
    return this.db.query.communities.findMany();
  }
}
