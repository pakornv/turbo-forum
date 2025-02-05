import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { RequestWithUser } from "src/auth/auth.guard";
import { DbService } from "src/db/db.service";
import { PostsRepository } from "src/posts/posts.repository";
import { CommentsController } from "./comments.controller";
import { CommentsRepository } from "./comments.repository";
import { CommentsService } from "./comments.service";

const commentId = "commentId";

// https://github.com/ai/nanoid/issues/363#issuecomment-1458167176
jest.mock("nanoid", () => {
  return { nanoid: () => commentId };
});

describe("CommentsController", () => {
  let controller: CommentsController;

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
      controllers: [CommentsController],
      providers: [
        CommentsService,
        DbService,
        JwtService,
        { provide: PostsRepository, useValue: mockPostsRepo },
        { provide: CommentsRepository, useValue: mockCommentsRepo },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should successfully create a comment", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const req = { user: { id: userId } } as RequestWithUser;
    const dto = {
      body: "This is my first comment.",
    };

    jest.spyOn(mockPostsRepo, "findOne").mockReturnValue(Promise.resolve({}));
    jest.spyOn(mockCommentsRepo, "save").mockReturnValue(Promise.resolve());

    const got = await controller.create(req, postId, dto);

    expect(got).toEqual(commentId);
  });

  it("should successfully find all comments", async () => {
    const postId = "-OPYEliQO-SbHDEOguHMa";
    const comments = [
      {
        id: commentId,
        body: "This is my first comment.",
        postId,
        authorId: "VWR0nXecTmF5b_wRD1o4y",
      },
    ];
    jest
      .spyOn(mockCommentsRepo, "findAllLatestByPostId")
      .mockReturnValue(comments);

    const got = await controller.findAllLatestByPostId(postId);

    expect(got).toEqual(comments);
  });
});
