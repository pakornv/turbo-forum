import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CommentsController } from "./comments/comments.controller";
import { CommentsModule } from "./comments/comments.module";
import { CommentsService } from "./comments/comments.service";
import { CommunitiesModule } from "./communities/communities.module";
import { DbModule } from "./db/db.module";
import { PostsModule } from "./posts/posts.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    DbModule,
    AuthModule,
    UsersModule,
    CommunitiesModule,
    PostsModule,
    CommentsModule,
    RouterModule.register([
      {
        path: "posts",
        module: PostsModule,
        children: [
          {
            path: ":postId/comments",
            module: CommentsModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController, CommentsController],
  providers: [AppService, CommentsService],
})
export class AppModule {}
