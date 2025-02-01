import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      // id: "sPNbRQDyrUst0w-jFu08I",
      name: "John Doe",
      email: "johndoe@example.com",
      username: "john",
      picture: "http://example.com/johndoe/me.jpg",
    },
    {
      // id: "ANjCOp-eOdvxzylpPHeNg",
      username: "jane",
      name: "Jane Doe",
      email: "janedoe@example.com",
      picture: "http://example.com/janedoe/me.jpg",
    },
  ];

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
