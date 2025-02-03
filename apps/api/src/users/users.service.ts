import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  async findOne(username: string) {
    return await this.repo.findOneByUsername(username);
  }
}
