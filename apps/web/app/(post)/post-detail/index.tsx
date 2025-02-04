"use client";

import { Avatar } from "@/components/avatar";
import { requireAuth } from "@/lib/auth/actions";
import { BackButton } from "@repo/ui/back-button";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { postQueries } from "../queries";
import { CreateCommentForm } from "./create-comment-form";
import { CreateCommentModal } from "./create-comment-modal";

type PostDetailProps = {
  id: string;
};

export function PostDetail({ id }: PostDetailProps) {
  const pathname = usePathname();

  const [isEditing, setIsEditing] = useState(false);

  const post = useQuery(postQueries.detail(id));

  if (post.isPending) {
    return <span>Loading...</span>;
  }

  if (post.isError) {
    throw post.error;
  }

  const backHref = pathname.split("/").slice(0, -1).join("/");

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-200">
        <div className="flex flex-col px-4 py-6 lg:px-10 lg:py-9">
          <BackButton href={backHref} />

          <div className="mt-10">
            <div className="flex items-center gap-x-2.5">
              <Avatar
                src={post.data.author.picture}
                alt={post.data.author.name}
                size="large"
              />
              <p className="text-sm font-medium text-[#191919]">
                {post.data.author.name}
              </p>
              <span className="text-grey-300 text-xs">
                {post.data.createdAt}
              </span>
            </div>

            <div className="mt-2.5">
              <Badge color="secondary">{post.data.community.name}</Badge>
            </div>
          </div>

          <div className="mt-4 text-[#101828]">
            <h3 className="text-[28px] font-semibold">{post.data.title}</h3>
            <p className="mt-3 text-xs text-[#191919]">{post.data.body}</p>
            <div className="mt-7">
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
                  {post.data.commentCount}
                  <span> Comments</span>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:mt-8 sm:block">
            {!isEditing ? (
              <Button
                variant="outline"
                onPress={async () => {
                  await requireAuth();
                  setIsEditing(true);
                }}
              >
                Add Comments
              </Button>
            ) : (
              <CreateCommentForm
                postId={post.data.id}
                onCancel={() => setIsEditing(false)}
                onSuccess={() => setIsEditing(false)}
              />
            )}
          </div>

          <div className="mt-7 block sm:hidden">
            <CreateCommentModal postId={post.data.id} />
          </div>

          <div className="mt-6">
            <CommentList postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

type CommentListProps = {
  postId: string;
};

function CommentList({ postId }: CommentListProps) {
  const comments = useQuery(postQueries.commentList(postId));

  if (comments.isPending) {
    return <span>Loading...</span>;
  }

  if (comments.isError) {
    throw comments.error;
  }

  return (
    <ul role="list" className="space-y-6">
      {comments.data.map((comment) => (
        <li key={comment.id}>
          <div className="flex items-center gap-x-2.5">
            <div className="shrink-0">
              <Avatar
                src={comment.author.picture}
                alt={comment.author.name}
                size="large"
              />
            </div>
            <h3 className="text-sm font-medium text-[#191919]">
              {comment.author.name}
            </h3>
            <span className="text-grey-300 text-xs">{comment.createdAt}</span>
          </div>
          <div className="mt-2">
            <p className="pl-12.5 text-xs text-[#191919]">{comment.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
