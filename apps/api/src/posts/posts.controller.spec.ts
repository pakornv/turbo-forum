import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { RequestWithUser } from "src/auth/auth.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { PostsService } from "./posts.service";

const postId = "-OPYEliQO-SbHDEOguHMa";

// https://github.com/ai/nanoid/issues/363#issuecomment-1458167176
jest.mock("nanoid", () => {
  return { nanoid: () => postId };
});

describe("PostsController", () => {
  let controller: PostsController;

  const mockRepo = {
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAllLatest: jest.fn(),
    findOneLatest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        JwtService,
        { provide: PostsRepository, useValue: mockRepo },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should successfully create a post", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    const req = { user: { id: userId } } as RequestWithUser;

    const newPostId = "-OPYEliQO-SbHDEOguHMa";
    const createPostDto: CreatePostDto = {
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
    };
    jest.spyOn(mockRepo, "save").mockReturnValue(newPostId);

    const result = await controller.create(req, createPostDto);

    expect(result).toEqual(newPostId);
  });

  it("should successfully find all posts", async () => {
    const authorId = "VWR0nXecTmF5b_wRD1o4y";
    const posts = [
      {
        id: "-OPYEliQO-SbHDEOguHMa",
        title: "Hello, World!",
        body: "This is my first post.",
        authorId: authorId,
        communityId: "_Xbjex1Kf3MS6ddx10La9",
      },
    ];
    jest.spyOn(mockRepo, "findAllLatest").mockReturnValue(posts);

    const result = await controller.findAllLatest(authorId);

    expect(result).toEqual(posts);
  });

  it("should successfully find a post by id", async () => {
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
    };
    jest.spyOn(mockRepo, "findOneLatest").mockReturnValue(post);

    const result = await controller.findOneLatest(postId);

    expect(result).toEqual(post);
  });

  it("should throw an error when the post does not exist", async () => {
    jest.spyOn(mockRepo, "findOneLatest").mockReturnValue(null);

    await expect(controller.findOneLatest(postId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should successfully update a post by id", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    const req = { user: { id: userId } } as RequestWithUser;
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const updatePostDto = { title: "Hello, World!" };
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
    };
    jest.spyOn(mockRepo, "findOne").mockReturnValue(post);
    jest.spyOn(mockRepo, "update").mockReturnValue(postId);

    const result = await controller.update(req, postId, updatePostDto);

    expect(result).toEqual(undefined);
  });

  it("should throw an error when the post does not exist", async () => {
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const updatePostDto = { title: "Hello, World!" };
    const req = { user: { id: "VWR0nXecTmF5b_wRD1o4y" } } as RequestWithUser;
    jest.spyOn(mockRepo, "findOne").mockReturnValue(null);

    await expect(controller.update(req, postId, updatePostDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should throw an error when updating a post that is not owned by the user", async () => {
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const updatePostDto = { title: "Hello, World!" };
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
    };
    const req = { user: { id: "anotherUserId" } } as RequestWithUser;
    jest.spyOn(mockRepo, "findOne").mockReturnValue(post);

    await expect(controller.update(req, postId, updatePostDto)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it("should successfully remove a post by id", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
    };
    const req = { user: { id: userId } } as RequestWithUser;
    jest.spyOn(mockRepo, "findOne").mockReturnValue(Promise.resolve(post));
    jest.spyOn(mockRepo, "delete").mockReturnValue(postId);

    const result = await controller.remove(req, postId);
    expect(result).toEqual(postId);
  });

  it("should throw an error when the post does not exist", async () => {
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const req = { user: { id: "VWR0nXecTmF5b_wRD1o4y" } } as RequestWithUser;
    jest.spyOn(mockRepo, "findOne").mockReturnValue(null);

    await expect(controller.remove(req, postId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should throw an error when removing a post that is not owned by the user", async () => {
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
    };
    const req = { user: { id: "anotherUserId" } } as RequestWithUser;
    jest.spyOn(mockRepo, "findOne").mockReturnValue(Promise.resolve(post));

    await expect(controller.remove(req, postId)).rejects.toThrow(
      ForbiddenException,
    );
  });
});
