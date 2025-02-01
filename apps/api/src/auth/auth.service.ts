import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
  ): Promise<{ access_token: string; id_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({ sub: user.id }),
      id_token: await this.jwtService.signAsync({
        sub: user.id,
        name: "Jane Doe",
        email: "janedoe@example.com",
        picture: "http://example.com/janedoe/me.jpg",
      }),
    };
  }
}
