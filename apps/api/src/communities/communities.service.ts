import { Injectable } from "@nestjs/common";
import { CommunitiesRepository } from "./communities.repository";

@Injectable()
export class CommunitiesService {
  constructor(private repo: CommunitiesRepository) {}
  // private communities = [
  //   { id: "MTjQbh7BF0MKQogLUMNLF", name: "History" },
  //   { id: "F_GN1aVI-rBQVf6IUiov_", name: "Food" },
  //   { id: "qRLVDnVKS2wFI6bc7t1KM", name: "Pets" },
  //   { id: "7Qhxlw9lFsj1Ch61tOSbl", name: "Health" },
  //   { id: "jrmbbdEve97SosLHD6W5C", name: "Fashion" },
  //   { id: "OB_hvVitHTqbaKQP8spwa", name: "Exercise" },
  //   { id: "8VWEjX7he8FYnA6veICOe", name: "Others" },
  // ];

  findAll() {
    return this.repo.findAll();
  }
}
