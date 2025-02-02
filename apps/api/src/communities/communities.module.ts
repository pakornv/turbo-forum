import { Module } from "@nestjs/common";
import { DbModule } from "src/db/db.module";
import { CommunitiesController } from "./communities.controller";
import { CommunitiesRepository } from "./communities.repository";
import { CommunitiesService } from "./communities.service";

@Module({
  imports: [DbModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesRepository],
})
export class CommunitiesModule {}
