import { Test, TestingModule } from "@nestjs/testing";
import { PostsRepository } from "src/posts/posts.repository";
import { PostNotFoundError } from "src/posts/posts.service";
import { CommentsRepository } from "./comments.repository";
import { CommentsService } from "./comments.service";

const commentId = "commentId";

// https://github.com/ai/nanoid/issues/363#issuecomment-1458167176
jest.mock("nanoid", () => {
  return { nanoid: () => commentId };
});

describe("CommentsService", () => {
  let service: CommentsService;

  const mockPostsRepo = {
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAllLatest: jest.fn(),
    findOneLatest: jest.fn(),
  };

  const mockCommentsRepo = {
    save: jest.fn(),
    findAllLatestByPostId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: PostsRepository, useValue: mockPostsRepo },
        { provide: CommentsRepository, useValue: mockCommentsRepo },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should successfully create a comment", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const dto = {
      body: "This is my first comment.",
    };

    const comment = {
      ...dto,
      id: commentId,
      postId,
      authorId: userId,
    };

    jest.spyOn(mockPostsRepo, "findOne").mockReturnValue(Promise.resolve());
    jest.spyOn(mockCommentsRepo, "save").mockReturnValue(Promise.resolve());

    const got = await service.create(postId, dto, userId);
    expect(mockPostsRepo.findOne).toHaveBeenCalledWith(postId);
    expect(mockCommentsRepo.save).toHaveBeenCalledWith(comment);
    expect(got).toEqual(commentId);
  });

  it("should throw an error when post not found", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const dto = {
      body: "This is my first comment.",
    };

    jest.spyOn(mockPostsRepo, "findOne").mockReturnValue(Promise.resolve(null));

    await expect(service.create(postId, dto, userId)).rejects.toThrow(
      PostNotFoundError,
    );
  });

  it("should successfully find all comments by post id", async () => {
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const comments = [
      {
        id: commentId,
        postId,
        body: "This is my first comment.",
        authorId: "VWR0nXecTmF5b_wRD1o4y",
      },
    ];

    jest
      .spyOn(mockCommentsRepo, "findAllLatestByPostId")
      .mockReturnValue(Promise.resolve(comments));

    const got = await service.findAllLatestByPostId(postId);
    expect(got).toEqual(comments);
    expect(mockCommentsRepo.findAllLatestByPostId).toHaveBeenCalledWith(postId);
  });
});
