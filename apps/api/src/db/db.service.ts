import { Injectable } from "@nestjs/common";
import { db } from "./drizzle";

@Injectable()
export class DbService {
  readonly db;

  constructor() {
    this.db = db;
  }
}
