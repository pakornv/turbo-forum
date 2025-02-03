export class Post {
  id: string;
  title: string;
  body: string;
  communityId: string;
  authorId: string;
  createdAt: string;
  // updatedAt: string;

  // constructor(
  //   title: string,
  //   body: string,
  //   communityId: string,
  //   authorId: string,
  // ) {
  //   this.id = nanoid();
  //   this.title = title;
  //   this.body = body;
  //   this.communityId = communityId;
  //   this.authorId = authorId;
  // }

  // update(
  //   title: string | undefined,
  //   body: string | undefined,
  //   communityId: string | undefined,
  //   actorId: string,
  // ) {
  //   if (this.authorId !== actorId) throw NotAllowedError;

  //   if (title) this.title = title;
  //   if (body) this.body = body;
  //   if (communityId) this.communityId = communityId;

  //   // this.updatedAt = new Date().toISOString();

  //   return this;
  // }
}
