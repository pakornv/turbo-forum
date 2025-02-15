import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  communityId: string;
}
