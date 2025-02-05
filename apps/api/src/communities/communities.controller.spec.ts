import { Test, TestingModule } from "@nestjs/testing";
import { DbService } from "src/db/db.service";
import { CommunitiesController } from "./communities.controller";
import { CommunitiesService } from "./communities.service";

describe("CommunitiesController", () => {
  let controller: CommunitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunitiesController],
      providers: [CommunitiesService, DbService],
    }).compile();

    controller = module.get<CommunitiesController>(CommunitiesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
