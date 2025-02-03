import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, RequestWithUser } from "src/auth/auth.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @Get()
  findAll(@Query("authorId") authorId?: string) {
    return this.postsService.findAll(authorId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postsService.remove(+id);
  }
}
