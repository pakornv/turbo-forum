import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CommunitiesModule } from "./communities/communities.module";
import { DbModule } from "./db/db.module";
import { PostsModule } from "./posts/posts.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [DbModule, UsersModule, AuthModule, PostsModule, CommunitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
