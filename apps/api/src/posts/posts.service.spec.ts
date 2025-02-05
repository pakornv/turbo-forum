import { Test, TestingModule } from "@nestjs/testing";
import { PostsRepository } from "./posts.repository";
import {
  PostNotAllowedError,
  PostNotFoundError,
  PostsService,
} from "./posts.service";

const postId = "-OPYEliQO-SbHDEOguHMa";

// https://github.com/ai/nanoid/issues/363#issuecomment-1458167176
jest.mock("nanoid", () => {
  return { nanoid: () => postId };
});

describe("PostsService", () => {
  let service: PostsService;

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
      providers: [
        PostsService,
        { provide: PostsRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should successfully create a post", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    const dto = {
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
    };

    const want = {
      ...dto,
      id: postId,
      authorId: userId,
    };

    jest.spyOn(mockRepo, "save").mockReturnValue(Promise.resolve());

    const got = await service.create(dto, userId);

    expect(mockRepo.save).toHaveBeenCalledWith(want);
    expect(got).toEqual(postId);
  });

  it("should successfully find a post", async () => {
    const want = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
    };

    jest.spyOn(mockRepo, "findOne").mockReturnValue(Promise.resolve(want));

    const got = await service.findOne(postId);

    expect(mockRepo.findOne).toHaveBeenCalledWith(postId);
    expect(got).toEqual(want);
  });

  it("should throw an error when finding a post that does not exist", async () => {
    jest
      .spyOn(mockRepo, "findOne")
      .mockImplementation(() => Promise.resolve(null));

    await expect(service.findOne(postId)).rejects.toThrow(PostNotFoundError);
  });

  it("should successfully update a post", async () => {
    const dto = {
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
    };

    const authorId = "VWR0nXecTmF5b_wRD1o4y";
    const want = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: authorId,
    };

    jest.spyOn(mockRepo, "findOne").mockResolvedValue(want);
    jest.spyOn(mockRepo, "save").mockReturnValue(Promise.resolve());

    await service.update(postId, dto, authorId);

    expect(mockRepo.findOne).toHaveBeenCalledWith(postId);
    expect(mockRepo.save).toHaveBeenCalledWith(want);
  });

  it("should throw an error when updating a post that does not exist", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    jest.spyOn(mockRepo, "findOne").mockResolvedValue(null);

    await expect(service.update(postId, {}, userId)).rejects.toThrow(
      PostNotFoundError,
    );
  });

  it("should throw an error when updating a post that is not owned by the user", async () => {
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
    };

    jest
      .spyOn(mockRepo, "findOne")
      .mockImplementation(() => Promise.resolve(post));

    await expect(service.update(postId, {}, "anotherUserId")).rejects.toThrow(
      PostNotAllowedError,
    );
  });

  it("should successfully remove a post", async () => {
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
    };

    jest.spyOn(mockRepo, "findOne").mockReturnValue(post);
    jest.spyOn(mockRepo, "delete").mockReturnValue(postId);

    await service.remove(postId, post.authorId);

    expect(mockRepo.findOne).toHaveBeenCalledWith(postId);
    expect(mockRepo.delete).toHaveBeenCalledWith(postId);
  });

  it("should throw an error when removing a post that does not exist", async () => {
    const userId = "VWR0nXecTmF5b_wRD1o4y";
    jest.spyOn(mockRepo, "findOne").mockReturnValue(null);

    await expect(service.remove(postId, userId)).rejects.toThrow(
      PostNotFoundError,
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

    jest.spyOn(mockRepo, "findOne").mockReturnValue(post);

    await expect(service.remove(postId, "anotherUserId")).rejects.toThrow(
      PostNotAllowedError,
    );
  });

  it("should successfully find all latest posts", async () => {
    const authorId = "VWR0nXecTmF5b_wRD1o4y";
    const posts = [
      {
        id: "-OPYElidQO-SbHDEOguHMa",
        title: "Hello, World!",
        body: "This is my first post.",
        authorId: authorId,
        communityId: "_Xbjex1Kf3MS6ddx10La9",
      },
    ];

    jest.spyOn(mockRepo, "findAllLatest").mockReturnValue(posts);

    const result = await service.findAllLatest(authorId);

    expect(mockRepo.findAllLatest).toHaveBeenCalledWith(authorId);
    expect(result).toEqual(posts);
  });

  it("should successfully find the latest post", async () => {
    const post = {
      id: postId,
      title: "Hello, World!",
      body: "This is my first post.",
      authorId: "VWR0nXecTmF5b_wRD1o4y",
      communityId: "_Xbjex1Kf3MS6ddx10La9",
    };

    jest.spyOn(mockRepo, "findOneLatest").mockReturnValue(post);

    const result = await service.findOneLatest(postId);

    expect(mockRepo.findOneLatest).toHaveBeenCalledWith(postId);
    expect(result).toEqual(post);
  });
});
