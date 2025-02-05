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
import {
  PostNotAllowedError,
  PostNotFoundError,
  PostsService,
} from "./posts.service";

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAllLatest(@Query("authorId") authorId?: string) {
    return await this.postsService.findAllLatest(authorId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postsService.create(createPostDto, req.user.id);
  }

  @Get(":id")
  async findOneLatest(@Param("id") id: string) {
    try {
      return await this.postsService.findOneLatest(id);
    } catch (error) {
      if (error instanceof PostNotFoundError) throw new NotFoundException();
      throw error;
    }
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  async update(
    @Req() req: RequestWithUser,
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      return await this.postsService.update(id, updatePostDto, req.user.id);
    } catch (error) {
      if (error instanceof PostNotFoundError) throw new NotFoundException();
      if (error instanceof PostNotAllowedError) throw new ForbiddenException();
      throw error;
    }
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async remove(@Req() req: RequestWithUser, @Param("id") id: string) {
    try {
      return await this.postsService.remove(id, req.user.id);
    } catch (error) {
      if (error instanceof PostNotFoundError) throw new NotFoundException();
      if (error instanceof PostNotAllowedError) throw new ForbiddenException();
      throw error;
    }
  }
}
