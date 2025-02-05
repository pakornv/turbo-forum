import { Test, TestingModule } from "@nestjs/testing";
import { DbService } from "src/db/db.service";
import { CommunitiesService } from "./communities.service";

describe("CommunitiesService", () => {
  let service: CommunitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitiesService, DbService],
    }).compile();

    service = module.get<CommunitiesService>(CommunitiesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
