import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, RequestWithUser } from "src/auth/auth.guard";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller()
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() req: RequestWithUser,
    @Param("postId") postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.create(
      postId,
      createCommentDto,
      req.user.id,
    );
  }

  @Get()
  async findAllLatestByPostId(@Param("postId") postId: string) {
    return await this.commentService.findAllLatestByPostId(postId);
  }
}
