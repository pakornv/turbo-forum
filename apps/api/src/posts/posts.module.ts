import { Module } from "@nestjs/common";
import { DbModule } from "src/db/db.module";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";

@Module({
  imports: [DbModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
