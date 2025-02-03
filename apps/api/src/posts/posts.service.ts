import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";
import { PostsRepository } from "./posts.repository";

@Injectable()
export class PostsService {
  constructor(private readonly repo: PostsRepository) {}
  // private posts: LatestPost[] = [
  //   {
  //     id: "1",
  //     title: "The Beginning of the End of the World",
  //     body: "The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer, they are weary. It is time for it all to end. The show’s solution to this perpetual happiness-cum-weariness is extinction. When you have had enough, when you are utterly sated by love and joy and pleasure, you can walk through a passage to nothingness. And Chidi has had enough.",
  //     publishedAt: "12h ago",
  //     commentCount: 32,
  //     community: {
  //       name: "History",
  //     },
  //     author: {
  //       name: "Wittawat",
  //       image:
  //         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  //     comments: [
  //       {
  //         id: "1",
  //         body: "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.",
  //         createdAt: "12h ago",
  //         creator: {
  //           name: "Wittawat98",
  //         },
  //       },
  //       {
  //         id: "2",
  //         body: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
  //         createdAt: "1mo. ago",
  //         creator: {
  //           name: "Hawaii51",
  //           image:
  //             "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //         },
  //       },
  //       {
  //         id: "3",
  //         body: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
  //         createdAt: "3mo. ago",
  //         creator: {
  //           name: "Helo_re",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "The Big Short War",
  //     body: "Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate and just the type to make a big wager with no margin for error. But on the night before the S.A.T., his father took pity on him and canceled the bet. “I would’ve lost it,” Ackman concedes. He got a 780 on the verbal and a 750 on the math. “One wrong on the verbal, three wrong on the math,” he muses. “I’m still convinced some of the questions were wrong.”",
  //     publishedAt: "12h ago",
  //     commentCount: 4,
  //     community: {
  //       name: "Pets",
  //     },
  //     author: {
  //       name: "Zach",
  //       image:
  //         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  //     comments: [],
  //   },
  //   {
  //     id: "3",
  //     title: "The Mental Health Benefits of Exercise",
  //     body: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
  //     publishedAt: "12h ago",
  //     commentCount: 32,
  //     community: {
  //       name: "Health",
  //     },
  //     author: {
  //       name: "Nicholas",
  //       image:
  //         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  //     comments: [],
  //   },
  //   {
  //     id: "4",
  //     title: "The Big Short War",
  //     body: "Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate and just the type to make a big wager with no margin for error. But on the night before the S.A.T., his father took pity on him and canceled the bet. “I would’ve lost it,” Ackman concedes. He got a 780 on the verbal and a 750 on the math. “One wrong on the verbal, three wrong on the math,” he muses. “I’m still convinced some of the questions were wrong.”",
  //     publishedAt: "12h ago",
  //     commentCount: 4,
  //     community: {
  //       name: "Pets",
  //     },
  //     author: {
  //       name: "Zach",
  //       image:
  //         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  //     comments: [],
  //   },
  //   {
  //     id: "5",
  //     title: "The Mental Health Benefits of Exercise",
  //     body: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
  //     publishedAt: "12h ago",
  //     commentCount: 32,
  //     community: {
  //       name: "Health",
  //     },
  //     author: {
  //       name: "Nicholas",
  //       image:
  //         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     },
  //     comments: [],
  //   },
  // ];

  create(createPostDto: CreatePostDto, authorId: string) {
    // const authorId = "EdF7VCzM3vJKBfxPe5MyR";

    const post = new Post(
      createPostDto.title,
      createPostDto.body,
      createPostDto.communityId,
      authorId,
    );

    return this.repo.save(post);
  }

  findAll(authorId?: string) {
    return this.repo.findAll(authorId);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
