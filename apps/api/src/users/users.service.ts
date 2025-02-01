import { Injectable } from "@nestjs/common";

export type User = {
  id: string;
  username: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: "ANjCOp-eOdvxzylpPHeNg",
      username: "john",
    },
    {
      id: "sPNbRQDyrUst0w-jFu08I",
      username: "maria",
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
