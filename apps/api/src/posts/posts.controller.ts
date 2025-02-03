import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, RequestWithUser } from "src/auth/auth.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { NotAllowedError, NotFoundError, PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll(@Query("authorId") authorId?: string) {
    return this.postsService.findAllLatest(authorId);
  }

  @Get(":id")
  async finOne(@Param("id") id: string) {
    try {
      return await this.postsService.findOneLatest(id);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    await this.postsService.create(createPostDto, req.user.id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  async update(
    @Req() req: RequestWithUser,
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      await this.postsService.update(id, updatePostDto, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      if (error instanceof NotAllowedError) throw new ForbiddenException();
      throw error;
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async remove(@Req() req: RequestWithUser, @Param("id") id: string) {
    try {
      await this.postsService.remove(id, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      if (error instanceof NotAllowedError) throw new ForbiddenException();
      throw error;
    }
  }
}
