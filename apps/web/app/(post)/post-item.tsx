"use client";

import { Badge } from "@repo/ui/badge";
import Image from "next/image";

type PostItemProps = {
  post: {
    title: string;
    body: string;
    commentCount: number;
    community: { name: string };
    author: { name: string; image: string };
  };
};

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="group block shrink-0">
      <div className="flex flex-col p-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-3">
            <Image
              width={32}
              height={32}
              src={post.author.image}
              className="inline-block size-8 rounded-full"
              alt=""
            />
            <p className="text-sm font-medium text-ui-grey-300">
              {post.author.name}
            </p>
          </div>
        </div>

        <div className="mt-3.75">
          <Badge color="secondary">{post.community.name}</Badge>
        </div>

        <div className="mt-1.25 text-[#101828]">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="mt-0.5 line-clamp-2 overflow-hidden text-xs">
            {post.body}
          </p>
          <div className="mt-2.5">
            <div className="flex items-center gap-x-1.25">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-ui-grey-300"
              >
                <path
                  d="M14.3398 8.40674C14.3398 11.7204 11.6536 14.4067 8.33984 14.4067C7.54175 14.4067 6.78005 14.2509 6.0835 13.968C5.95019 13.9139 5.88354 13.8868 5.82966 13.8747C5.77695 13.8629 5.73795 13.8586 5.68393 13.8586C5.62871 13.8586 5.56857 13.8686 5.44828 13.8887L3.07635 14.284C2.82797 14.3254 2.70377 14.3461 2.61397 14.3076C2.53537 14.2739 2.47273 14.2112 2.43902 14.1326C2.4005 14.0428 2.4212 13.9186 2.46259 13.6702L2.85792 11.2983C2.87796 11.178 2.88799 11.1179 2.88798 11.0627C2.88797 11.0086 2.88365 10.9696 2.87184 10.9169C2.85976 10.863 2.83269 10.7964 2.77855 10.6631C2.49567 9.96654 2.33984 9.20483 2.33984 8.40674C2.33984 5.09303 5.02614 2.40674 8.33984 2.40674C11.6536 2.40674 14.3398 5.09303 14.3398 8.40674Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs text-ui-grey-300">
                {post.commentCount}
                <span> Comments</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
