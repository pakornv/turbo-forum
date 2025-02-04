import { Module } from "@nestjs/common";
import { PostsService } from "src/posts/posts.service";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PostsService],
})
export class CommentsModule {}
